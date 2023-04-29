import { type FormEvent, useState, type ChangeEvent } from "react"
import { api } from "~/utils/api"

interface AddressFormProps {
  onSubmit?: () => void
}

export default function AddressForm({ onSubmit }: AddressFormProps) {
  const defaultNewAddress = {
    street: "",
    province: "",
    postalCode: "",
    phoneNumber: "",
  }
  const [newAddress, setNewAddress] = useState(defaultNewAddress)
  const createAddress = api.address.create.useMutation({
    onSettled() {
      if (onSubmit) {
        onSubmit()
      }
    },
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const nameCamelCase = e.target.name.replace(/-([a-z])/g, function (g) {
      return g[1] ? g[1].toUpperCase() : ""
    })
    setNewAddress({ ...newAddress, [nameCamelCase]: e.target.value })
  }

  const handleSubmitAddress = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createAddress.mutate(newAddress)
  }

  return (
    <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmitAddress}>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="label" className="label">
          <span className="label-text">Label (optional)</span>
        </label>
        <input
          id="label"
          name="label"
          type="text"
          onChange={handleChange}
          placeholder="My Primary Address"
          className="input-bordered input input-sm w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="street" className="label">
          <span className="label-text">Street</span>
        </label>
        <input
          id="street"
          name="street"
          type="text"
          onChange={handleChange}
          className="input-bordered input input-sm w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="unit" className="label">
          <span className="label-text">Unit</span>
        </label>
        <input
          id="unit"
          name="unit"
          type="text"
          onChange={handleChange}
          className="input-bordered input input-sm w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="phone-number" className="label">
          <span className="label-text">Phone Number</span>
        </label>
        <input
          id="phone-number"
          name="phone-number"
          type="text"
          onChange={handleChange}
          className="input-bordered input input-sm w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="province" className="label">
          <span className="label-text">Province</span>
        </label>
        <select
          id="province"
          name="province"
          onChange={handleChange}
          className="select-bordered select select-sm"
        >
          <option>Ontario</option>
          <option>Vancouver</option>
          <option>Quebec</option>
        </select>
      </div>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="postal-code" className="label">
          <span className="label-text">Postal Code</span>
        </label>
        <input
          id="postal-code"
          name="postal-code"
          type="text"
          onChange={handleChange}
          className="input-bordered input input-sm w-full max-w-xs"
        />
      </div>
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  )
}
