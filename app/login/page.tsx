"use client";
import { useState } from "react";
import Link from "next/link";
import { useLogInMutation } from "@/generated/graphql-frontend";
import { useRouter } from "next/navigation";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const [values, setValues] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const router = useRouter();

  const [loginMutation] = useLogInMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await loginMutation({
        variables: {
          input: {
            username: values.username,
            password: values.password,
          },
        },
      });
      if (result.data?.login?.message) {
        setLoginMessage(result.data?.login?.message);
      }
      if (result.data?.login?.accessToken && result.data.login.id) {
        localStorage.setItem("userId", `${result.data?.login?.id}`);
        localStorage.setItem(
          "accessToken",
          `${result.data?.login?.accessToken}`
        );
        router.push("/");
      }
    } catch (e) {}
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
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="my-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Login
          </button>

          <Link
            href="/createUser"
            className="my-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Create Account
          </Link>
        </div>
        {loginMessage && loginMessage !== "success" && (
          <div>{loginMessage}</div>
        )}
      </form>
    </main>
  );
}
