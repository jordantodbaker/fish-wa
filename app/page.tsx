"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { County, useCountiesQuery } from "../generated/graphql-frontend";
import { NextUIProvider } from "@nextui-org/react";
import LakesAccordion from "@/components/LakesAccordion";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const [userId, setUserId] = useState("")!;

  const { data, loading } = useCountiesQuery();
  const counties = data?.counties as [County];

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    setUserId(userId as any);
    if (!accessToken) {
      router.push("/login");
    }
  }, []);

  return loading ? (
    <>Loading...</>
  ) : counties ? (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div>Welcome</div>
        <Link href={{ pathname: "/account", query: { id: userId } }}>
          Account
        </Link>
        <LakesAccordion counties={counties} userId={parseInt(userId)} />
      </main>
    </NextUIProvider>
  ) : (
    <>Error</>
  );
}
