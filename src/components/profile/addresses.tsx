import type { Address } from "@prisma/client"
import { api } from "~/utils/api"
import AddressForm from "./addressForm"

export default function Addresses() {
  const addresses = api.address.getAllCurrentUser.useQuery()
  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-lg font-bold sm:card-title">Addresses</h2>
          <div className="flex flex-col">
            {addresses.data?.map((address: Address) => {
              return (
                <div key={address.id} className="">
                  {address.street}
                </div>
              )
            })}
          </div>
          <div className="card-actions mt-2 justify-end">
            <label
              htmlFor="my-modal-3"
              className="btn-outline btn-primary btn-sm btn"
            >
              Add Address
            </label>
          </div>
        </div>
      </div>
      <AddressForm />
    </>
  )
}
