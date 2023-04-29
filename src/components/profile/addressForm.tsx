import { api } from "~/utils/api"
import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createInput } from "~/schemas/address"
import Input from "../Input"

interface AddressFormProps {
  onSubmit?: () => void
}

interface AddressFormInput {
  label?: string
  unit?: string
  street: string
  province: string
  postalCode: string
  phoneNumber: string
}

export default function AddressForm({
  onSubmit: parentOnSubmit,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormInput>({ resolver: zodResolver(createInput) })

  const createAddress = api.address.create.useMutation({
    onSettled() {
      if (parentOnSubmit) {
        parentOnSubmit()
      }
    },
  })

  const onSubmit: SubmitHandler<AddressFormInput> = (data) => {
    createAddress.mutate(data)
  }

  return (
    <form
      className="mt-2 flex flex-col gap-2"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input register={register} label="label" error={errors.label?.message} />
      <Input register={register} label="unit" error={errors.unit?.message} />
      <Input
        register={register}
        label="street"
        error={errors.street?.message}
      />
      <div className="form-control w-full max-w-xs">
        <label htmlFor="province" className="label">
          <span className="label-text">Province</span>
        </label>
        <select
          id="province"
          {...register("province")}
          className="select-bordered select select-sm"
        >
          <option>Ontario</option>
          <option>Vancouver</option>
          <option>Quebec</option>
        </select>
        {errors && <p>{errors.province?.message}</p>}
      </div>
      <Input
        register={register}
        label="phoneNumber"
        error={errors.phoneNumber?.message}
      />
      <Input
        register={register}
        label="postalCode"
        error={errors.postalCode?.message}
      />
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  )
}
