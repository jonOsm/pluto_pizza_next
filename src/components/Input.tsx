import { type PropsWithChildren } from "react"
import { UseFormRegister } from "react-hook-form"

// Using typescript with custom components is fincky.
// I've opted to wrap the input with a shell instead
// TODO: revisit converting InputShell to a full Input component
interface Input {
  label: string
  register: UseFormRegister<any>
  error?: string
}
export default function Input({
  label,
  error,
  register,
}: PropsWithChildren<Input>) {
  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor="label" className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        id="label"
        {...register(label)}
        type="text"
        placeholder="Home"
        className="input-bordered input input-sm w-full max-w-xs"
      />
      {error && <p>{error}</p>}
    </div>
  )
}
