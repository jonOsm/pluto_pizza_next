import { signOut } from "next-auth/react"
import Link from "next/link"

export default function TopBarDropdown() {
  const closeDropdown = () => {
    const elem = document.activeElement
    if (elem) {
      //I want to just do (elem as HTMLINputElemnt but prettier adds a semi colon and ts complains about semi colons...)
      const elemAsInput = elem as HTMLInputElement
      elemAsInput.blur()
    }
  }
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
        <div className="w-10 rounded-full">
          <img src="https://placehold.co/50x50" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li onClick={closeDropdown}>
          <Link href={"/profile"}>Profile</Link>
        </li>
        <li>
          <a onClick={() => void signOut()}>Logout</a>
        </li>
      </ul>
    </div>
  )
}
