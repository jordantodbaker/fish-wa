"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCountiesQuery } from "../generated/graphql-frontend";
import { NextUIProvider } from "@nextui-org/react";
import LakesAccordion from "@/components/LakesAccordion";

export default function Home() {
  const router = useRouter();
  //const accessToken = localStorage.getItem("accessToken");
  const { data } = useCountiesQuery();
  const counties = data?.counties;
  console.log(counties);
  // if (!accessToken) {
  //   router.push("/login");
  // }
  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div>Welcome</div>
        <LakesAccordion counties={counties} />
      </main>
    </NextUIProvider>
  );
}
