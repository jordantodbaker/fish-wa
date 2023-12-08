"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const uri = process.env.IS_DEV
    ? "http://localhost:3000/api/graphql"
    : "https://fish-wa.vercel.app/api/graphql";

  if (process.env.IS_DEV) {
    console.log("IS DEV - localhost");
  } else {
    console.log("IS PROD - vercel");
  }

  console.log("IS DEV: ", process.env.IS_DEV);
  console.log("THE URI IS: ", uri);
  const httpLink = new HttpLink({
    uri: uri,
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
