"use client";

import { useSession } from "next-auth/react";
import axios from "./axios";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/refreshToken", {
      refreshToken: session?.user.refresh_token,
    });

    if (session) {
      session.user.access_token = res.data.accessToken;
    }
  };

  return refreshToken;
};
