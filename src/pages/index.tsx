import { type NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

import { api } from "~/utils/api"
import TopBar from "~/components/TopBar"

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" })
  console.log(api.example.getAll)
  return (
    <>
      <Head>
        <title>Pluto Pizza</title>
        <meta name="description" content="Pizza from out of this world!" />
        {/* TODO: update favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* 
      topbar 
        menu buttom (mobile)
          Menu
          About?
        logo (all)
        signin/profile (all)
          links to login/sign up
      body
        pages
          menu
            lists all menu items
      */}
        content plz
      </main>
    </>
  )
}

export default Home
