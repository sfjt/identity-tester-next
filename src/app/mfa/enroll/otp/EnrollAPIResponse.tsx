"use client"

import useSWRImmutable from "swr/immutable"

async function enroll(uri: string) {
  const res = await fetch(uri, {
    method: "post",
    body: JSON.stringify({
      authenticator_types: ["otp"],
    }),
  })
  const body = await res.json()
  return {
    status: res.status,
    body,
  }
}

export default function EnrollAPIResponse() {
  const { data, error, isLoading } = useSWRImmutable("/api/mfa/enroll", enroll)
  if (error) {
    return <p>Something went wrong.</p>
  }
  if (isLoading || !data) {
    return <p>Loading...</p>
  }
  return (
    <section>
      <h3>Enroll With OTP</h3>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </section>
  )
}
