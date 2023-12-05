"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { County, useCountiesQuery } from "../generated/graphql-frontend";
import { NextUIProvider } from "@nextui-org/react";
import { LakesAccordion, Loader, StockingReport } from "@/components";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserQuery } from "../generated/graphql-frontend";

export default function Home() {
  const router = useRouter();
  const { user: authUser, error, isLoading } = useUser();

  if (!isLoading && !authUser) {
    router.push("/api/auth/login");
  }

  const { data: userData, loading: userLoading } = useUserQuery({
    variables: { email: authUser?.email },
  });

  const [user, setUser] = useState(userData?.user);

  useEffect(() => {
    if (!userLoading) {
      setUser(userData?.user);
    }
  }, [userLoading]);

  console.log();

  return isLoading || userLoading ? (
    <Loader />
  ) : user ? (
    <main className="flex min-h-screen flex-col items-center p-24">
      {user.stockingReports.length > 0 && (
        <StockingReport stockingReports={user.stockingReports} />
      )}
      <LakesAccordion user={user} setUser={setUser} />
    </main>
  ) : (
    <>Error</>
  );
}
