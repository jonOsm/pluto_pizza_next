import { type PropsWithChildren } from "react"
import { type UseFormRegister } from "react-hook-form"
import { camelToTitle } from "~/utils/formatting"

interface InputProps {
  name: string
  label?: string
  // Note: My understanding is that we'd have to define a type for
  // every field registered here. I think this is a sensible use of "any"
  // with little downside.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  error?: string
}
export default function Input({
  name,
  label,
  error,
  register,
}: PropsWithChildren<InputProps>) {
  label = label || camelToTitle(name)

  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor="label" className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        id="label"
        {...register(name)}
        type="text"
        placeholder="Home"
        className="input-bordered input input-sm w-full max-w-xs"
      />
      {error && <p>{error}</p>}
    </div>
  )
}
