import { type PropsWithChildren } from "react"
import { useSpring, animated } from "@react-spring/web"
interface ModalProps {
  isHidden: boolean
  onClose: () => void
}

export default function Modal({
  isHidden,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) {
  // const outerSpring = useSpring({ from: { opacity: 0 }, to: { opacity: 100 } })
  return (
    <>
      <animated.div
        // style={{ ...outerSpring }}
        className={"modal " + (isHidden ? "" : "modal-open")}
      >
        <div className="modal-box relative">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Add New Address</h3>
            <button onClick={onClose} className="btn-sm btn-circle btn">
              ✕
            </button>
          </div>
          <div>{children}</div>
        </div>
      </animated.div>
    </>
  )
}
