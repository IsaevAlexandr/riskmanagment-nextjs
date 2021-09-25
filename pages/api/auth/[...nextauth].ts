import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { prismaClient } from "../../../utils/prismaClient";
import { validateUserPassword } from "../../../utils/authService";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Логин пользователя",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ password, username }, _req) => {
        const user = await prismaClient.user.findUnique({
          where: { username },
        });

        if (!user)
          throw new Error(
            encodeURIComponent(
              `Пользователя в логином "${username}" не существует`
            )
          );

        const credentials = await prismaClient.credentials.findFirst({
          where: { user },
        });

        if (!credentials)
          throw new Error(
            encodeURIComponent(
              `Пользователь ${username} авторизован через стороннего провайдера. Создайте нового пользователя через форму регистрации или войдите с помощью провайдера`
            )
          );

        const isValidUser = validateUserPassword(credentials, password);

        if (isValidUser) {
          // if needed can override user payload https://next-auth.js.org/getting-started/client
          // by default has name email image properties
          return {
            ...user,
            name: user.username || user.name,
          };
        } else {
          throw new Error(encodeURIComponent(`Неверный пароль пользователя`));
        }
      },
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma: prismaClient }),
  secret: process.env.SECRET,
  database: process.env.DATABASE_URL,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
});
