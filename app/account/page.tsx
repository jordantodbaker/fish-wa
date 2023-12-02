"use client";
import React, { useState } from "react";
import { useUserQuery } from "@/generated/graphql-frontend";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Input } from "@nextui-org/react";

interface Values {
  email: string;
  phoneNumber: string;
  lakes: [number];
}

const Account = () => {
  const { user: authUser, error, isLoading } = useUser();

  const { data, loading } = useUserQuery({
    variables: { email: authUser.email },
  });

  const { user } = data;
  const [values, setValues] = useState<Values>({
    email: user.email,
    phoneNumber: user.phoneNumber,
    lakes: user.lakes,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // try {
    //   const result = await updateTask({
    //     variables: { input: { id, title: values.title } },
    //   });
    //   if (result.data?.updateTask) {
    //     router.push("/");
    //   }
    // } catch (e) {}
  };

  console.log({ user });
  return loading && isLoading ? (
    <>Loading...</>
  ) : (
    <>
      <h1>Account Settings</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="alert-error">{error.message}</p>}
        <p>
          <label className="field-label">Email</label>
          <Input
            type="text"
            name="email"
            className="text-input"
            value={values.email}
            disabled
          />
        </p>
        <p>
          <label className="field-label">Phone Number</label>
          <Input
            type="number"
            name="phoneNumber"
            className="text-input"
            value={values.phoneNumber}
            disabled
          />
        </p>
        <p>
          <Button className="button" type="submit" disabled={loading}>
            {loading ? "Loading" : "Save"}
          </Button>
        </p>
      </form>
    </>
  );
};

export default Account;
