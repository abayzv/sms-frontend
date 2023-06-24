import "../src/app/globals.css"
import "../src/app/style.css"
import { SessionProvider, useSession } from "next-auth/react"
import { ReactElement } from "react"
import Layout from "../components/layout/main"

export default function App({
    Component,
    pageProps: { session, ...pageProps },
  }: {
    Component: any,
    pageProps: any,
  }) {
    return (
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>
            <Layout>
                <Component {...pageProps} />
            </Layout>
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    )
  }
  
  function Auth({ children } : { children: ReactElement }) {
    // const router = useRouter()
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { status } = useSession({ required: true })
  
    if (status === "loading") {
      return <div>Loading...</div>
    }
  
    return children
  }