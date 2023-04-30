import { api } from "~/utils/api"
import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createValidation } from "~/validation/address"
import Input from "../Input"
import { type Address } from "@prisma/client"

interface AddressFormProps {
  onSubmit?: () => void
  defaultValues?: Partial<Address>
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
  defaultValues,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormInput>({
    defaultValues: defaultValues as AddressFormInput,
    resolver: zodResolver(createValidation),
  })

  const createAddress = api.address.create.useMutation({
    onSuccess() {
      if (parentOnSubmit) {
        parentOnSubmit()
      }
    },
  })

  const updateAddress = api.address.update.useMutation({
    onSuccess() {
      if (parentOnSubmit) {
        parentOnSubmit()
      }
    },
  })

  const onSubmit: SubmitHandler<AddressFormInput> = (data) => {
    if (defaultValues?.id) {
      updateAddress.mutate({ ...data, id: defaultValues.id })
      return
    }

    createAddress.mutate(data)
  }

  return (
    <form
      className="mt-2 flex flex-col gap-2"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input register={register} name="label" error={errors.label?.message} />
      <Input register={register} name="unit" error={errors.unit?.message} />
      <Input register={register} name="street" error={errors.street?.message} />
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
        name="phoneNumber"
        error={errors.phoneNumber?.message}
      />
      <Input
        register={register}
        name="postalCode"
        error={errors.postalCode?.message}
      />
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  )
}
