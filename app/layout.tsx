import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo-provider";

import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fish WA",
  description: "Tight lines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <UserProvider>
          <ApolloWrapper>
            {children}
            {/* <Footer>Footer</Footer> */}
          </ApolloWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
