"use client"

import useSWRImmutable from "swr/immutable"

async function fetchSession(uri: string) {
  const res = await fetch(uri)
  return {
    status: res.status,
    statusText: res.statusText,
  }
}

export default function TestAPIWithSession() {
  const { data, error, isLoading } = useSWRImmutable("/api/test/session", fetchSession)
  if (error) {
    return <p>Something went wrong.</p>
  }
  if (isLoading || !data) {
    return <p>Loading...</p>
  }

  return (
    <p>
      <code>
        {data.status} {data.statusText}
      </code>
    </p>
  )
}
