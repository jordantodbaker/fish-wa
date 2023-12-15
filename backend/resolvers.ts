import { getUniqueLakeListById } from "@/app/utils/arrays";
import {
  Resolvers,
  Lake,
  StockingReport,
  UserLakes,
} from "@/generated/graphql-backend";
import { Connection, ExecutedQuery } from "@planetscale/database";

interface ApolloContext {
  db: Connection;
}

interface UserDbRow {
  id: number;
  email: string;
  sendText: boolean;
  sendEmail: boolean;
  phoneNumber: string;
  lakeId: number;
  name: string;
  date: string;
  number: number;
  species: string;
  size: number;
}

interface CountyDbRow {
  id: number;
  name: string;
  shortName: string;
  lakeName: string;
  lakeId: string;
}

const GetUserByEmail = async (email: string | undefined, db: Connection) => {
  let query = `SELECT u.id, u.email, u.phoneNumber, u.sendText, u.sendEmail, ul.lakeId, l.name, sr.date, sr.number, sr.species, sr.size 
  FROM users u 
LEFT JOIN usersLakes ul ON ul.userId  = u.id 
LEFT JOIN  lakes l ON l.id = ul.lakeId
LEFT JOIN stockingReport sr ON sr.lakeId = l.id WHERE u.email = ?;`;

  let result: ExecutedQuery = await db.execute(query, [email]);

  let userResult = result.rows as UserDbRow[];
  if (userResult.length === 0) {
    await db.execute(
      "INSERT INTO users (email, lastLogin, lastNotification) VALUES (?, NOW(), NOW());",
      [email]
    );
    result = await db.execute(query, [email]);
    userResult = result.rows as UserDbRow[];
  }
  const lakeIds = userResult
    .map((user: UserDbRow) => user.lakeId)
    .filter(Number);

  const lakes: (Lake | undefined)[] = userResult
    .map((user: UserDbRow) => {
      if (user.lakeId) {
        return { id: user.lakeId, name: user.name } as Lake;
      }
    })
    .filter((n) => n);

  const stockingReports = userResult
    .map((user) => {
      if (user.name) {
        return {
          lakeId: user.lakeId,
          name: user.name,
          date: user.date,
          number: user.number,
          species: user.species,
          size: user.size,
        } as StockingReport;
      }
    })
    .filter((n) => n && n.date)
    .sort((a, b) => {
      return new Date(b?.date!).getTime() - new Date(a?.date!).getTime();
    });
  const user = {
    id: userResult[0].id,
    email: userResult[0].email,
    phoneNumber: userResult[0].phoneNumber,
    sendText: userResult[0].sendText,
    sendEmail: userResult[0].sendEmail,
    lakeIds: lakeIds,
    lakes: getUniqueLakeListById(lakes) as [Lake],
    stockingReports: stockingReports as [StockingReport],
  };
  return user;
};

export const resolvers: Resolvers<ApolloContext> = {
  Query: {
    user: async (parent, args, context) => {
      const { email } = args;
      return await GetUserByEmail(email as string, context.db);
    },
    counties: async (parent, args, context) => {
      const counties: ExecutedQuery = await context.db.execute(
        "SELECT c.id, c.name, c.shortName, l.name as lakeName, l.id as lakeId FROM counties c INNER JOIN lakes l ON l.countyId = c.id ORDER BY c.name, l.name ASC;"
      );
      let lakes = [] as any;
      let prevCounty = counties.rows[0] as CountyDbRow;
      const countyRows = counties.rows as CountyDbRow[];
      const result = countyRows.reduce((acc, county, idx) => {
        if (typeof county.id !== "undefined") {
          if (prevCounty.id != county.id) {
            acc.push({
              id: prevCounty.id || "",
              name: prevCounty.name,
              shortName: prevCounty.shortName,
              lakes: lakes,
            });
            lakes = [];
            lakes.push({ name: county.lakeName, id: county.lakeId });
          } else if (idx === countyRows.length - 1) {
            lakes.push({ name: county.lakeName, id: county.lakeId });
            acc.push({
              id: prevCounty.id || "",
              name: prevCounty.name,
              shortName: prevCounty.shortName,
              lakes: lakes,
            });
          } else {
            lakes.push({ name: county.lakeName, id: county.lakeId });
          }
          prevCounty = county;
        }
        return acc;
      }, [] as any);

      return result;
    },
  },
  Mutation: {
    updateUserLakes: async (parent, args, context) => {
      const { userId, lakeIds } = args.input;
      await context.db.execute("DELETE FROM usersLakes WHERE userId = ?", [
        userId,
      ]);
      const sql = "INSERT INTO usersLakes (userId, lakeId) VALUES (?, ?)";
      lakeIds.forEach(async (lakeId) => {
        await context.db.execute(sql, [userId, lakeId]);
      });

      const result = await context.db.execute(
        "SELECT email FROM users WHERE id = ?",
        [userId]
      );
      const row = result.rows[0] as UserDbRow;

      return GetUserByEmail(row.email, context.db);
    },
    updateUser: async (parent, args, context) => {
      const { userId, phoneNumber, sendText, sendEmail } = args.input;
      context.db.execute(
        "UPDATE users SET phoneNumber = ?, sendText = ?, sendEmail = ? WHERE id = ?",
        [phoneNumber, sendText, sendEmail, userId]
      );
      return userId;
    },
  },
};
