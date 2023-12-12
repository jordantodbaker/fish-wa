import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: async (req, res) => {
    try {
      return await handleLogin(req, res, { returnTo: "/home" });
    } catch (error) {
      console.error(error);
    }
  },
});
