import EnrollAPIResponse from "./EnrollAPIResponse"
import VerifyAPIResponse from "./VerifyAPIResponse"

export default async function enrollWithOTP() {
  return (
    <>
      <EnrollAPIResponse />
      <VerifyAPIResponse />
    </>
  )
}
