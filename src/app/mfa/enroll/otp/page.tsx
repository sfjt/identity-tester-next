import EnrollAPIResponse from "./EnrollAPIResponse"
import VerifyAPIResponse from "./VerifyAPIResponse"

export default async function enrollWithOTP(uri: string) {
  return (
    <>
      <EnrollAPIResponse />
      <VerifyAPIResponse />
    </>
  )
}
