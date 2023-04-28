import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { api } from "~/utils/api"

interface UserInfoFormProps {
  isHidden: boolean
  onSubmit: () => void
  onClose: () => void
  // userInfo: { name: string; email: string }
}

export default function UserInfoForm({
  isHidden,
  onSubmit,
  onClose,
}: // userInfo,
UserInfoFormProps) {
  const { data: session, status } = useSession()
  console.log("status:", status)
  const [name, setName] = useState(session?.user.name)
  const [email, setEmail] = useState(session?.user.email)
  // const [name, setName] = useState("lkjlkj")
  // const [email, setEmail] = useState("lsdkjflkj")
  const mutation = api.user.updateInfo.useMutation({
    onSuccess: () => {
      onSubmit()
      mutation.reset()
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (name && email) {
      mutation.mutate({ name, email })
    }
    e.preventDefault()
  }

  return (
    <>
      <div className={"modal " + (isHidden ? "" : "modal-open")}>
        <div className="modal-box relative">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Update User Info {name}</h3>
            <label
              htmlFor="user-info-modal"
              className="btn-sm btn-circle btn"
              onClick={onClose}
            >
              ✕
            </label>
          </div>
          <form
            className="mt-2 flex flex-col gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="form-control w-full max-w-xs">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Type here"
                value={name ?? ""}
                onChange={(e) => setName(e.target.value)}
                className="input-bordered input input-sm w-full max-w-xs"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="text"
                placeholder="Type here"
                value={email ?? ""}
                onChange={(e) => setEmail(e.target.value)}
                className="input-bordered input input-sm w-full max-w-xs"
              />
            </div>
            <label htmlFor="user-info-model w-full">
              <button type="submit" className="btn">
                Submit
              </button>
            </label>
          </form>
        </div>
      </div>
    </>
  )
}
