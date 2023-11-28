import { Resolvers, User, DisplayUser } from "@/generated/graphql-backend";
import mysql from "serverless-mysql";
import { OkPacket } from "mysql";
import { hashPassword, validateUser, hashWithSalt } from "./utils/passwords";

interface ApolloContext {
  db: mysql.ServerlessMysql;
}

interface UserDbRow {
  id: number;
  username: string;
  password: string;
  salt: string;
  phoneNumber: string;
}

type Lake = {
  name: String;
};

interface CountyDbRow {
  id: number;
  name: string;
  shortName: string;
  lakeName: string;
  lakeId: string;
}

type UserDbQueryResult = UserDbRow[];
type CountyDbQueryResult = CountyDbRow[];

const getUserById = async (id: number, db: mysql.ServerlessMysql) => {
  const result = await db.query<UserDbQueryResult>(
    "SELECT id, username, password, salt, phoneNumber FROM users WHERE id = ?",
    [id]
  );
  return result.length
    ? {
        id: result[0].id,
        username: result[0].username,
        password: result[0].password,
        salt: result[0].salt,
        phoneNumber: result[0].phoneNumber,
      }
    : null;
};

export const resolvers: Resolvers<ApolloContext> = {
  Query: {
    users: async (parent, args, context) => {
      let query = "SELECT id, username, password, salt, phoneNumber FROM users";

      const users = await context.db.query<UserDbQueryResult>(query);
      await context.db.end();
      return users.map(({ id, username, password, salt, phoneNumber }) => ({
        id,
        username,
        password,
        salt,
        phoneNumber,
      }));
    },
    counties: async (parent, args, context) => {
      const counties = await context.db.query<CountyDbQueryResult>(
        "SELECT c.id, c.name, c.shortName, l.name as lakeName, l.id as lakeId FROM counties c INNER JOIN lakes l ON l.countyId = c.id"
      );
      await context.db.end();
      let lakes = [] as any;
      let prevCounty = counties[0];
      const result = counties.reduce((acc, county) => {
        if (typeof county.id !== "undefined") {
          if (prevCounty.id != county.id) {
            acc.push({
              id: prevCounty.id || "",
              name: prevCounty.name,
              shortName: prevCounty.shortName,
              lakes: lakes,
            });
            lakes = [];
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
    //
    // TODO: Access Tokens
    //
    login: async (parent, args, context) => {
      const { username, password } = args.input;
      let message = "";
      const query =
        "SELECT id, username, phoneNumber, password, salt FROM users WHERE username = ?";
      const user = await context.db.query<UserDbQueryResult>(query, [username]);
      if (user.length > 0) {
        const hashedInput = await hashWithSalt(password, user[0].salt);
        const validPassword = user[0].password === hashedInput;
        message = validPassword ? "success" : "Password is incorrect";
      } else {
        message = "User not found.";
      }
      await context.db.end();
      const displayUser = {
        id: user[0]?.id,
        username: username,
        phoneNumber: user[0]?.phoneNumber,
        message: message,
        accessToken: "blah",
      };
      console.log("Display User: ", displayUser);
      return displayUser;
    },
    createUser: async (parent, args, context) => {
      const { hash, salt } = await hashPassword(args.input.password);
      const result = await context.db.query<OkPacket>(
        "INSERT INTO users (username, password, salt) VALUES (?, ?, ?)",
        [args.input.username, hash, salt]
      );
      return {
        id: result.insertId,
        username: args.input.username,
        phoneNumber: "",
        message: "userCreated",
      };
    },
  },
};
