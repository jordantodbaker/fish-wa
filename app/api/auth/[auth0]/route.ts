import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";
import { NextPageRouterHandler } from "@auth0/nextjs-auth0/edge";

const login = async (req: NextRequest, res: any) => {
  try {
    return await handleLogin(req, res, { returnTo: "/home" });
  } catch (error) {
    console.error(error);
  }
};

export const GET = handleAuth({
  login: login as unknown as NextPageRouterHandler,
});
