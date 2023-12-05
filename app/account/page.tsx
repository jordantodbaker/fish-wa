"use client";
import React, { useState, useEffect } from "react";
import {
  useUserLazyQuery,
  UpdateUserValues,
} from "@/generated/graphql-frontend";
import { useUser } from "@auth0/nextjs-auth0/client";

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

  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const [values, setValues] = useState<UpdateUserValues>({
    phoneNumber: undefined,
    sendText: undefined,
    sendEmail: undefined,
  });

  const email = authUser ? authUser.email : null;

  const [getUser, { data, loading: userLoading }] = useUserLazyQuery({
    variables: { email: email },
    onCompleted: (data) => {
      setUser(data?.user);
      setPageLoading(false);
    },
  });

  console.log("DATA: ", data);

  useEffect(() => {
    console.log("WE IN HERE", email);
    if (email) {
      console.log("AGAINAINANAN", email);
      getUser();
    }
  }, [email]);

  const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  };

  console.log("Values: ", values);
  console.log({ user });
  return pageLoading ? (
    <Loader />
  ) : (
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
        <MyLakes lakes={getUniqueListBy(user?.lakes, "id")} />
      </div>
      <div className="width-auto">
        <h1>Add Lakes To Your Subscription</h1>
        <LakesAccordion user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default Account;
