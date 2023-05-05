import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { Strait } from "next/font/google"
import "@fortawesome/fontawesome-svg-core/styles.css"

import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

import { api } from "~/utils/api"

import "~/styles/globals.css"
import TopBar from "~/components/TopBar"
import Starfield from "~/components/Starfield"
import Footer from "~/components/Footer"

const strait = Strait({ subsets: ["latin"], weight: "400" })

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {/* Padding used to negate collapsing topmargin */}
      <div
        data-theme="business"
        style={strait.style}
        className="relative min-h-screen bg-base-300 p-[0.05px] sm:bg-gradient-to-br sm:from-base-300 sm:to-base-100"
      >
        <TopBar />
        <div className="relative overflow-x-hidden p-3">
          <Component {...pageProps} />
        </div>
        <Footer></Footer>
        {/* <Starfield></Starfield> */}
      </div>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
