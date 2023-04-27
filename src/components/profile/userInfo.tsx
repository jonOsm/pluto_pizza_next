import { useSession } from "next-auth/react"
import UserInfoForm from "./userInfoForm"

export default function UserInfo() {
  const { data: sessionData } = useSession()
  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-lg font-bold">User Info</h2>
          <div>
            <p>
              <span>Name: </span> {sessionData?.user.name}
            </p>
            <p>
              <span>Email: </span> {sessionData?.user.email}
            </p>
          </div>

          <div className="card-actions mt-2 justify-end">
            <label
              htmlFor="user-info-modal"
              className="btn-outline btn-primary btn-sm btn"
            >
              Update Info
            </label>
          </div>
        </div>
      </div>
      <UserInfoForm />
    </>
  )
}
