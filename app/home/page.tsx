"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LakesAccordion, Loader, MyLakes, StockingReport } from "@/components";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  StockingReport as StockingReportType,
  User,
  useUserQuery,
} from "../../generated/graphql-frontend";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();
  const { user: authUser, error, isLoading } = useUser();

  if (!isLoading && !authUser) {
    router.push("/api/auth/login");
  }

  const { data: userData, loading: userLoading } = useUserQuery({
    variables: { email: authUser?.email! },
  });

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!userLoading) {
      setUser(userData?.user!);
    }
  }, [userLoading, userData?.user]);

  console.log({ user });

  return isLoading || userLoading ? (
    <Loader />
  ) : user ? (
    <>
      <Header />
      <main className="flex min-h-screen flex-col p-24">
        {user.lakes!.length > 0 && <MyLakes lakes={user.lakes!} />}
        {user.stockingReports!.length > 0 && (
          <StockingReport
            stockingReports={user.stockingReports! as [StockingReportType]}
          />
        )}
        {user.lakes!.length == 0 && (
          <>
            <div>
              <h1>You're not subscribed to any lakes yet</h1>
            </div>
            <LakesAccordion user={user} setUser={setUser} />
          </>
        )}
      </main>
    </>
  ) : (
    <>Error</>
  );
}
