import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      roleId: number;
      roleName: string;
      address: string;
      access_token: string;
      refresh_token: string;
    };
  }
}
