"use client";

import { useSession } from "next-auth/react";
import axios from "./axios";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/refreshToken", {
      // @ts-ignore
      refreshToken: session.user.refresh_token,
    });

    if (session) {
      update({
        user: {
          ...session.user,
          access_token: res.data.accessToken,
          refresh_token: res.data.refreshToken,
        },
      });
    }
  };

  return refreshToken;
};
