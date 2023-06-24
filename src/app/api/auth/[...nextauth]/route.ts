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
      session.user = token as any;
      return session;
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
        const email: any = credentials?.email;
        const password: any = credentials?.password;

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            email: "super@admin.com",
            password: "P@ssw0rd",
          }
        );

        const user = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          }
        );

        const userData = {
          id: user.data.id,
          name: user.data.name,
          email: user.data.email,
          image: user.data.image,
          roleId: user.data.roleID,
          roleName: user.data.roleName,
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
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
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
