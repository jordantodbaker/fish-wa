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
import Header from "@/components/Header";

const Account = () => {
  const { user: authUser, error, isLoading } = useUser();
  const router = useRouter();

  if (!isLoading && typeof authUser === "undefined") {
    router.push("/api/auth/login");
  }

  const [user, setUser] = useState<User | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  const [values, setValues] = useState<UpdateUserValues>({
    phoneNumber: user?.phoneNumber,
    sendText: user?.sendText,
    sendEmail: user?.sendEmail,
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

  useEffect(() => {
    setValues({
      phoneNumber: user?.phoneNumber,
      sendText: user?.sendText,
      sendEmail: user?.sendEmail,
    });
  }, [user]);

  return pageLoading ? (
    <Loader />
  ) : user && user ? (
    <>
      <Header />
      <div className="flex min-h-screen flex-col  p-24">
        <div className="mb-6">
          <h1>Account Settings</h1>
          <p>Email: {email}</p>
          <AccountSettingForm setUser={setUser} user={user} />
        </div>
        <div className="mb-6">
          <MyLakes lakes={getUniqueLakeListById(user.lakes!)} />
        </div>
        <div className="width-auto">
          <h1>Add Lakes To Your Subscription</h1>
          <LakesAccordion user={user} setUser={setUser} />
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Account;
