// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createYoga } from "graphql-yoga";
import { schema } from "../../../backend/schema";
import { connect } from "@planetscale/database";

const config = {
  host: process.env.PS_DB_HOST,
  username: process.env.PS_DB_USER,
  password: process.env.PS_DB_PASSWORD,
};

const { handleRequest } = createYoga({
  schema: schema,
  context: { db: connect(config) },
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
