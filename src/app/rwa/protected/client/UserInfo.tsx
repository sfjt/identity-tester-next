"use client"

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client"

export default withPageAuthRequired(() => {
  const { isLoading, error, user } = useUser()
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return (
      <p>
        {error.name}: {error.message}
      </p>
    )
  }
  if (user) {
    return (
      <>
        <p>Authenticated.</p>
        <dl>
          <dt>Sub:</dt>
          <dd>{user.sub || "N/A"}</dd>
          <dt>Email:</dt>
          <dd>{user.email || "N/A"}</dd>
        </dl>
      </>
    )
  }
  return <p>N/A</p>
})
