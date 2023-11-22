"use client";

import {
  useCreateUserMutation,
  CreateUserInput,
} from "@/generated/graphql-frontend";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateUserInputForm {
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const CreateUser = () => {
  const [values, setValues] = useState<CreateUserInputForm>({
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const router = useRouter();

  const [createUser, { data, error, loading }] = useCreateUserMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ values });
    if (values.password === values.confirmPassword) {
      try {
        await createUser({
          variables: {
            input: {
              username: values.username,
              password: values.password,
              phoneNumber: values.phoneNumber,
              salt: "",
            },
          },
        });
        router.push("/login");
      } catch (e) {}
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Username
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="username"
            id="username"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="username"
            onChange={handleChange}
            value={values.username}
          />
        </div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Phone Number
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="phoneNumber"
            onChange={handleChange}
            value={values.phoneNumber}
          />
        </div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="password"
            id="password"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Confirm Password
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="confirm password"
            onChange={handleChange}
            value={values.confirmPassword}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="my-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create Account
        </button>
      </form>
    </main>
  );
};

export default CreateUser;
