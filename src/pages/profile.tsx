import { Address } from "@prisma/client"
import { FormEvent, useState } from "react"
import { api } from "~/utils/api"

export default function Profile() {
  const [label, setLabel] = useState("")
  const [unit, setUnit] = useState("")
  const [street, setStreet] = useState("")
  const [province, setProvince] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  // const hello = api.example.hello.useQuery({ text: "huh" })
  const addresses = api.address.getAllCurrentUser.useQuery()
  const createAddress = api.address.create.useMutation()
  const hello = api.example.testMutation.useMutation()

  const handleSubmitAddress = (e: FormEvent<HTMLFormElement>) => {
    createAddress.mutate({
      label: "a label",
      unit: "23",
      street: "123 fake",
      province: "Ontario",
      postalCode: "xxxxxx",
      phoneNumber: "234234234",
    })
    e.preventDefault()
  }
  return (
    <div>
      <div>{hello.data?.email ?? hello.error?.message}</div>
      {addresses.data && addresses.data.length > 0
        ? addresses.data?.map((a: Address) => {
            return <p key={a.id}>{a.street}</p>
          })
        : "No Addresses"}
      <form className="flex flex-col" onSubmit={handleSubmitAddress}>
        <label>label: </label>
        <input
          value={label}
          type="text"
          onChange={(e) => setLabel(e.target.value)}
        ></input>

        <label>Unit: </label>
        <input
          value={unit}
          type="text"
          onChange={(e) => setUnit(e.target.value)}
        ></input>

        <label>Street: </label>
        <input
          value={street}
          type="text"
          onChange={(e) => setStreet(e.target.value)}
        ></input>
        <label>province: </label>
        <input
          value={province}
          type="text"
          onChange={(e) => setProvince(e.target.value)}
        ></input>
        <label>Postal Code: </label>
        <input
          value={postalCode}
          type="text"
          onChange={(e) => setPostalCode(e.target.value)}
        ></input>
        <label>Phone number:</label>
        <input
          value={phoneNumber}
          type="text"
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <div>new address: {createAddress.data?.street}</div>
    </div>
  )
}
