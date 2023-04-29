import { useSession } from "next-auth/react"
import UserInfoForm from "./userInfoForm"
import { useState } from "react"
import Modal from "../Modal"

export default function UserInfo() {
  const { data: sessionData, update: sessionUpdate } = useSession({
    required: true,
  })
  const [formIsHidden, setFormIsHidden] = useState(true)
  const handleUpdateInfoSubmit = async () => {
    setFormIsHidden(!formIsHidden)
    await sessionUpdate()
  }
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
            <button
              onClick={() => setFormIsHidden(false)}
              className="btn-outline btn-primary btn-sm btn"
            >
              Update Info
            </button>
          </div>
        </div>
      </div>
      <Modal
        isHidden={formIsHidden}
        onClose={() => setFormIsHidden(!formIsHidden)}
      >
        <UserInfoForm
          isHidden={formIsHidden}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleUpdateInfoSubmit}
        />
      </Modal>
    </>
  )
}
