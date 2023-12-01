"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useUserQuery } from "@/generated/graphql-frontend";

const Account = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const { data: userLakes, loading: userLoading } = useUserQuery({
    variables: { id: userId },
  });

  console.log({ userId });
  return (
    <>
      <h1>Account Settings</h1>
    </>
  );
};

export default Account;
