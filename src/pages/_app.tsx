import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import "@fortawesome/fontawesome-svg-core/styles.css"

import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

import { api } from "~/utils/api"

import "~/styles/globals.css"
import TopBar from "~/components/TopBar"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {/* Padding used to negate collapsing topmargin */}
      <div
        data-theme="business"
        className="bg-gradient-to-br from-black to-base-content p-[0.05px]"
      >
        <TopBar />
        <div className="p-3">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
