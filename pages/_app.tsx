import "../src/app/globals.css"
import "../src/app/style.css"
import loading from "./loading.json"
import { SessionProvider, useSession } from "next-auth/react"
import { ReactElement } from "react"
import Layout from "../components/layout/main"
import Lottie from "lottie-react"
import { motion, AnimatePresence } from "framer-motion"

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
            <AnimatePresence>
              <Component {...pageProps} />
            </AnimatePresence>
          </Layout>
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }: { children: ReactElement }) {
  // const router = useRouter()
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return (
      <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
       className="w-screen h-screen flex items-center justify-center">
        <Lottie animationData={loading} style={{
          width: "200px",
        }} />
      </motion.div>
    )
  }

  return children
}