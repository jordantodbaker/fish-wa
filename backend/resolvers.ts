import {
  Resolvers,
  Lake,
  User,
  DisplayUser,
  StockingReport,
  UserLakes,
} from "@/generated/graphql-backend";
import mysql from "serverless-mysql";
import { OkPacket } from "mysql";
import { hashPassword, validateUser, hashWithSalt } from "./utils/passwords";

interface ApolloContext {
  db: mysql.ServerlessMysql;
}

interface UserDbRow {
  id: number;
  email: string;
  password: string;
  salt: string;
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

type UserDbQueryResult = UserDbRow[];
type CountyDbQueryResult = CountyDbRow[];

export const resolvers: Resolvers<ApolloContext> = {
  Query: {
    user: async (parent, args, context) => {
      const { email } = args;

      let query = `SELECT u.id, u.email, u.phoneNumber, ul.lakeId, l.name, sr.date, sr.number, sr.species, sr.size 
           FROM users u 
      LEFT JOIN usersLakes ul ON ul.userId  = u.id 
      LEFT JOIN  lakes l ON l.id = ul.lakeId
      LEFT JOIN stockingReport sr ON sr.lakeId = l.id WHERE u.email = ? `;

      let result = await context.db.query<UserDbQueryResult>(query, email);
      if (result.length === 0) {
        await context.db.query(
          "INSERT INTO users (email, lastLogin, lastNotification) VALUES (?, NOW(), NOW())",
          [email]
        );
        result = await context.db.query<UserDbQueryResult>(query, email);
      }
      const lakeIds = result.map((user) => user.lakeId).filter(Number);
      const lakes: (Lake | undefined)[] = result
        .map((user: UserDbRow) => {
          if (user.lakeId) {
            return { id: user.lakeId, name: user.name } as Lake;
          }
        })
        .filter((n) => n);
      const stockingReports = result
        .map((user) => {
          if (user.name) {
            return {
              lakeId: user.lakeId,
              name: user.name,
              date: user.date,
              number: user.number,
              species: user.species,
              size: user.size,
            };
          }
        })
        .filter((n) => n && n.date);
      const user = {
        id: result[0].id,
        email: result[0].email,
        phoneNumber: result[0].phoneNumber,
        lakeIds: lakeIds,
        lakes: lakes as [Lake],
        stockingReports: stockingReports as [StockingReport],
      };
      console.log("USER:", user);
      return user;
    },
    counties: async (parent, args, context) => {
      const counties = await context.db.query<CountyDbQueryResult>(
        "SELECT c.id, c.name, c.shortName, l.name as lakeName, l.id as lakeId FROM counties c INNER JOIN lakes l ON l.countyId = c.id"
      );
      await context.db.end();
      let lakes = [] as any;
      let prevCounty = counties[0];
      const result = counties.reduce((acc, county, idx) => {
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
          } else if (idx === counties.length - 1) {
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
    createUser: async (parent, args, context) => {
      const result = await context.db.query<OkPacket>(
        "INSERT INTO users (email, phoneNumber, lastNotification) VALUES (?, ?, ?, ?, NOW())",
        [args.input.email, args.input.phoneNumber]
      );
      return {
        id: result.insertId,
        email: args.input.email,
        phoneNumber: "",
        message: "userCreated",
      };
    },
    updateUserLakes: async (parent, args, context) => {
      const { userId, lakeIds } = args.input;
      console.log({ userId });
      console.log({ lakeIds });
      context.db.query("DELETE FROM usersLakes WHERE userId = ?", [userId]);
      const sql = "INSERT INTO usersLakes (userId, lakeId) VALUES (?, ?)";
      lakeIds.forEach((lakeId) => {
        context.db.query(sql, [userId, lakeId]);
      });
      context.db.end();
      const userLakes: UserLakes = { userLakes: [] };
      return userLakes;
    },
    updateUser: async (parent, args, context) => {
      const { userId, phoneNumber, sendText, sendEmail } = args.input;
      context.db.query(
        "UPDATE users SET phoneNumber = ?, sendText = ?, sendEmail = ? WHERE id = ?",
        [phoneNumber, sendText, sendEmail, userId]
      );
      return userId;
    },
  },
};
