import { type PropsWithChildren } from "react"

interface ModalProps {
  isHidden: boolean
  onClose: () => void
}

export default function Modal({
  isHidden,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <>
      <div className={"modal " + (isHidden ? "" : "modal-open")}>
        <div className="modal-box relative">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Add New Address</h3>
            <button onClick={onClose} className="btn-sm btn-circle btn">
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
