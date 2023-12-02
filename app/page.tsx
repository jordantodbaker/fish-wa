"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { County, useCountiesQuery } from "../generated/graphql-frontend";
import { NextUIProvider } from "@nextui-org/react";
import LakesAccordion from "@/components/LakesAccordion";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserQuery } from "../generated/graphql-frontend";
import StockingReport from "@/components/StockingReport";

export default function Home() {
  const router = useRouter();
  const { user: authUser, error, isLoading } = useUser();

  if (!isLoading && !authUser) {
    router.push("/api/auth/login");
  }

  const { data, loading } = useCountiesQuery();
  const counties = data?.counties as [County];

  const { data: userData, loading: userLoading } = useUserQuery({
    variables: { email: authUser?.email },
  });

  const [user, setUser] = useState(userData?.user);

  useEffect(() => {
    if (!loading) {
      setUser(userData?.user);
    }
  }, [userLoading]);

  return isLoading || loading || userLoading ? (
    <>Loading...</>
  ) : counties && user ? (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div>
          Welcome <Link href="api/auth/logout">Log out</Link>
        </div>
        <Link href={{ pathname: "/account" }}>Account</Link>
        {user.stockingReports.length > 0 && (
          <StockingReport stockingReports={user.stockingReports} />
        )}
        <LakesAccordion counties={counties} user={user} setUser={setUser} />
      </main>
    </NextUIProvider>
  ) : (
    <>Error</>
  );
}
