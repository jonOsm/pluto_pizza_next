import type { Address } from "@prisma/client"
import { api } from "~/utils/api"
import AddressForm from "./addressForm"
import Modal from "../Modal"
import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// import the icons you need
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"

export default function Addresses() {
  const [isHidden, setIsHidden] = useState(true)
  const [defaultValues, setDefaultValues] = useState<Partial<Address>>({})

  const addresses = api.address.getAllCurrentUser.useQuery()

  const addressDelete = api.address.delete.useMutation({
    async onSuccess() {
      await addresses.refetch()
    },
  })
  const handleDelete = (addressId: string) => {
    addressDelete.mutate(addressId)
  }

  const handleEdit = (address: Address) => {
    setDefaultValues(address)
    setIsHidden(false)
  }

  const handleAddClick = () => {
    setDefaultValues({})
    setIsHidden(false)
  }

  const handleClose = () => {
    setIsHidden(true)
  }

  const handleSubmit = async () => {
    await addresses.refetch()
    setIsHidden(true)
  }

  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-lg font-bold sm:card-title">Addresses</h2>
          <div className="flex flex-col">
            {addresses.data && addresses.data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table-compact table w-full">
                  <thead>
                    <tr>
                      <th>Label</th>
                      <th>Street</th>
                      <th>Unit</th>
                      <th>Province</th>
                      <th>Phone #</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {addresses.data?.map((address: Address) => {
                      return (
                        <tr key={address.id}>
                          <th>{address.label}</th>
                          <td>{address.street}</td>
                          <td>{address.unit}</td>
                          <td>{address.province}</td>
                          <td>{address.phoneNumber}</td>
                          <td onClick={() => handleEdit(address)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </td>
                          <td onClick={() => handleDelete(address.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              "No addresses Found"
            )}
          </div>
          <div className="card-actions mt-2 justify-end">
            <button
              onClick={handleAddClick}
              className="btn-outline btn-primary btn-sm btn"
            >
              Add Address
            </button>
          </div>
        </div>
      </div>
      {/* TODO: Transition handled by Daisy CSS classes but we need to reset the form,
                Opted to destroy for instead of dealing with sorting out reset logic.
                Either a) add animation on  mount/destroy or b) sort out aforementioned logic */}
      {!isHidden && (
        <Modal isHidden={isHidden} onClose={handleClose}>
          <AddressForm
            defaultValues={defaultValues}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
    </>
  )
}
