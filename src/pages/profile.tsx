import { FormEvent, useState } from "react"
import { api } from "~/utils/api"

export default function Profile() {
  const [name, setName] = useState("")
  // const hello = api.example.hello.useQuery({ text: "huh" })
  const hello = api.example.testMutation.useMutation()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    hello.mutate({ name: "testing" })
    e.preventDefault()
  }
  return (
    <div>
      <label>Name: </label>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        ></input>
      </form>
      <div>{hello.data?.email ?? hello.error?.message}</div>
    </div>
  )
}
