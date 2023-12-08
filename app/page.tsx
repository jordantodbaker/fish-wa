"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LakesAccordion, Loader, StockingReport } from "@/components";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  StockingReport as StockingReportType,
  User,
  useUserQuery,
} from "../generated/graphql-frontend";

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

  return isLoading || userLoading ? (
    <Loader />
  ) : user ? (
    <main className="flex min-h-screen flex-col p-24">
      {user.stockingReports!.length > 0 ? (
        <StockingReport
          stockingReports={user.stockingReports! as [StockingReportType]}
        />
      ) : (
        <LakesAccordion user={user} setUser={setUser} />
      )}
    </main>
  ) : (
    <>Error</>
  );
}
