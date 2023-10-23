import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions: AuthOptions = {
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, user, token }) {
      session.user = {
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        email: token.email,
        firstName: token.firstName,
        lastName: token.lastName,
      } as any;
      return { ...session, ...user };
    },
    async jwt({ token, user, account, profile, trigger, session }) {
      // if trigger update , set new token
      if (trigger === "update") {
        token = {
          ...token,
          ...session.user,
        };
      }

      return { ...token, ...user };
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email: string = req?.body?.email;
        const password: string = req?.body?.password;

        const loginBody = {
          email: email,
          password: password,
        }

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`, loginBody)

        const { data: user } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${data.data.accessToken}`,
            },
          }
        )

        const userData = {
          id: user.data.id,
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
          roleId: user.data.roleId,
          roleName: user.data.roleName,
          access_token: data.data.accessToken,
          refresh_token: data.data.refreshToken,
        };

        if (user) {
          return userData;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
