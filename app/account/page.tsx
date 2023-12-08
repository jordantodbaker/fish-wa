"use client";
import React, { useState, useEffect } from "react";
import {
  Lake,
  User,
  useUserLazyQuery,
  UpdateUserValues,
} from "@/generated/graphql-frontend";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUniqueLakeListById } from "../utils/arrays";

import {
  AccountSettingForm,
  LakesAccordion,
  Loader,
  MyLakes,
} from "@/components";
import { useRouter } from "next/navigation";

const Account = () => {
  const { user: authUser, error, isLoading } = useUser();
  const router = useRouter();

  if (!isLoading && typeof authUser === "undefined") {
    router.push("/api/auth/login");
  }

  const [user, setUser] = useState<User | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  const [values, setValues] = useState<UpdateUserValues>({
    phoneNumber: undefined,
    sendText: undefined,
    sendEmail: undefined,
  });

  const email = authUser ? authUser.email! : "";

  const [getUser, { data, loading: userLoading }] = useUserLazyQuery({
    variables: { email: email },
    onCompleted: (data) => {
      setUser(data?.user!);
      setPageLoading(false);
    },
  });

  useEffect(() => {
    if (email) {
      getUser();
    }
  }, [email, getUser]);

  console.log({ user });

  return pageLoading ? (
    <Loader />
  ) : user && user ? (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-6">
        <h1>Account Settings</h1>
        <p>Email: {email}</p>
        <AccountSettingForm
          userId={user.id}
          values={values}
          setValues={setValues}
        />
      </div>
      <div className="mb-6">
        <MyLakes lakes={getUniqueLakeListById(user.lakes!)} />
      </div>
      <div className="width-auto">
        <h1>Add Lakes To Your Subscription</h1>
        <LakesAccordion user={user} setUser={setUser} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Account;
