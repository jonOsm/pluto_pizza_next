import { type PropsWithChildren } from "react"

// Using typescript with custom components is fincky.
// I've opted to wrap the input with a shell instead
// TODO: revisit converting InputShell to a full Input component
interface InputShell {
  label: string
  error?: string
}
export default function InputShell({
  label,
  error,
  children,
}: PropsWithChildren<InputShell>) {
  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor="label" className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
      {error && <p>{error}</p>}
    </div>
  )
}
