"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCountiesQuery } from "../generated/graphql-frontend";

export default function Home() {
  const router = useRouter();
  const accessToken = localStorage.getItem("accessToken");
  const counties = useCountiesQuery();
  if (!accessToken) {
    router.push("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>Welcome</div>
    </main>
  );
}
