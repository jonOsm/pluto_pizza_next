import { type FormEvent, useState } from "react"
import { api } from "~/utils/api"

export default function AddressForm() {
  const [label, setLabel] = useState("")
  const [unit, setUnit] = useState("")
  const [street, setStreet] = useState("")
  const [province, setProvince] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const createAddress = api.address.create.useMutation()

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
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Add New Address</h3>
            <label htmlFor="my-modal-3" className="btn-sm btn-circle btn">
              ✕
            </label>
          </div>
          <form
            className="mt-2 flex flex-col gap-2"
            onSubmit={handleSubmitAddress}
          >
            <div className="form-control w-full max-w-xs">
              <label htmlFor="label" className="label">
                <span className="label-text">Label (optional)</span>
              </label>
              <input
                id="label"
                type="text"
                placeholder="My Primary Address"
                className="input-bordered input input-sm w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="label" className="label">
                <span className="label-text">Label</span>
              </label>
              <input
                id="label"
                type="text"
                placeholder="Type here"
                className="input-bordered input input-sm w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="label" className="label">
                <span className="label-text">Label</span>
              </label>
              <input
                id="label"
                type="text"
                placeholder="Type here"
                className="input-bordered input input-sm w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="label" className="label">
                <span className="label-text">Label</span>
              </label>
              <input
                id="label"
                type="text"
                placeholder="Type here"
                className="input-bordered input input-sm w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="label" className="label">
                <span className="label-text">Label</span>
              </label>
              <input
                id="label"
                type="text"
                placeholder="Type here"
                className="input-bordered input input-sm w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="label" className="label">
                <span className="label-text">Label</span>
              </label>
              <input
                id="label"
                type="text"
                placeholder="Type here"
                className="input-bordered input input-sm w-full max-w-xs"
              />
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
