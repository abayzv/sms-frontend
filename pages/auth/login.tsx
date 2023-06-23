import "../../src/app/globals.css"
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { signIn } from "next-auth/react";
import Icon from "@/components/icon";
import Image from "next/image";

export default function SignIn({
  csrfToken,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="bg-blue-500 fixed top-0 w-full h-screen flex items-center justify-center">
      {/* <div className="cloud fixed top-0 left-0 w-[100%] h-[100%] -z-10 transform translate-y-20 opacity-100"></div> */}
      {/* <div className="wayang bg-no-repeat fixed top-0 left-0 w-[100%] h-[100%] -z-10 scale-105"></div> */}
      <div className="sm:min-w-[500px] bg-white shadow-md p-10 rounded-md grid gap-5">
        <div className="w-full flex flex-col items-center justify-center">
          <Image src="https://mahesadev.com/logo-sms.png" width={200} height={200} alt="logo sms" />
          <div className="mt-3 text-lg font-semibold">System Management School</div>
        </div>
        {error && (
          <div className="text-red-500 text-left bg-red-200 p-3">
            Email atau password tidak valid
          </div>
        )}
        <div>
          <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="grid gap-2 mb-3">
              <label className="text-neutral-500">Email</label> 
              <div className="flex border">
                <div className="flex items-center justify-center p-2 px-3 bg-slate-200">
                <Icon name="users" />
                </div>
                <input
                  name="email"
                  type="text"
                  className="p-2 px-4 w-full border-none outline-none"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="grid gap-2 mb-3">
              <label className="text-neutral-500">Password</label>
              <div className="flex border">
              <div className="flex items-center justify-center p-2 px-3 bg-slate-200">
                <Icon name="key" />
                </div>
                <input
                  name="password"
                  type="password"
                  className="p-2 px-4 w-full border-none outline-none"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="w-full text-end">
              <div className="text-neutral-500">Forgot Password ?</div>
              <button
                type="submit"
                className="mt-5 w-full bg-orange-500 p-3 px-5 rounded text-white"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // get query params
  const { error } = context.query;

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      error: error || null,
    },
  };
}
