import { useSession } from "next-auth/react"
import { type FormEvent, useState } from "react"
import { api } from "~/utils/api"

interface UserInfoFormProps {
  isHidden: boolean
  onSubmit: () => void
  // userInfo: { name: string; email: string }
}

export default function UserInfoForm({
  onSubmit,
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
  )
}
