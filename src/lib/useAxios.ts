"use client";

import { axiosAuth } from "./axios";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRefreshToken } from "./useRefreshToken";

const useAxios = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${session?.user.access_token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const response = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${session?.user.access_token}`;

          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestInterceptor);
      axiosAuth.interceptors.response.eject(response);
    };
  }, [session]);

  return axiosAuth;
};

export default useAxios;