import Addresses from "~/components/profile/addresses"
import UserInfo from "~/components/profile/userInfo"

export default function Profile() {
  return (
    <div className="flex flex-col gap-3">
      <UserInfo />
      <Addresses />
    </div>
  )
}
