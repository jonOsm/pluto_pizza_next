import { useSession, signIn, signOut } from "next-auth/react"
import { createRef, useState } from "react"
import Link from "next/link"
import TopBarDropdown from "./TopBarDropdown"
import { Bruno_Ace_SC } from "next/font/google"

const bruno = Bruno_Ace_SC({ subsets: ["latin"], weight: "400" })

export default function TopBar() {
  const { data: sessionData } = useSession()
  const [dropdownActive, setDropdownActive] = useState(false)

  const handleClick = () => {
    const elem = document.activeElement
    if (elem) {
      //I want to just do (elem as HTMLINputElemnt but prettier adds a semi colon and ts complains about semi colons...)
      const elemAsInput = elem as HTMLInputElement
      elemAsInput.blur()
    }
  }

  return (
    <div className="container navbar bg-base-100 p-3 shadow-md sm:mx-auto sm:mt-3 sm:rounded-3xl sm:shadow-xl">
      <div className="navbar-start">
        {/* <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div> */}
        <div className="flex flex-1 ">
          <Link
            href="/"
            className={
              "flex items-center gap-2 text-base normal-case sm:text-xl " +
              bruno.className
            }
          >
            <img
              className=""
              width="50"
              height="50"
              src="/pluto_pizza_logo_2.png"
            ></img>
            Pluto Pizza
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        {sessionData?.user ? (
          <>
            <TopBarDropdown />
          </>
        ) : (
          <a className="btn" onClick={() => void signIn()}>
            Sign In
          </a>
        )}
      </div>
    </div>
  )
}
