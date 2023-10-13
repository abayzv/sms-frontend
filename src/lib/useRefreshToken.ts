"use client";

import { useSession } from "next-auth/react";
import axios from "./axios";
import { signOut } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    try {
      const res = await axios.post("/auth/refresh-token", {
        // @ts-ignore
        refreshToken: session.user.refresh_token,
      },
        {
          headers: {
            "Authorization": `Bearer ${session?.user.access_token}`,
          },
        }
      );

      if (session) {
        update({
          user: {
            ...session.user,
            access_token: res.data.data.token,
            refresh_token: res.data.data.refreshToken,
          },
        });
      }
    } catch (error: any) {
      if (
        error.response.status === 401 ||
        error.response.data.message === "jwt expired"
      ) {
        await signOut();
      }
    }
  };

  return refreshToken;
};
