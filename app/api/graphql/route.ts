// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createYoga } from "graphql-yoga";
import { schema } from "../../../backend/schema";
import { connect } from "@planetscale/database";

const config = {
  host: process.env.PLANETSCALE_DB_HOST,
  username: process.env.PLANETSCALE_DB_USERNAME,
  password: process.env.PLANETSCALE_DB_PASSWORD,
};

const { handleRequest } = createYoga({
  schema: schema,
  context: { db: connect(config) },
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
