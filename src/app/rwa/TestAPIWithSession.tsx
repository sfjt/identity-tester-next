"use client"

import useSWRImmutable from "swr/immutable"

async function fetchSession(uri: string) {
  const res = await fetch(uri)
  const body = await res.json()
  return {
    status: res.status,
    body
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
    <>
      <p>
        <code>
          {data.status}
        </code>
      </p>
      <pre>
        <code>
          {JSON.stringify(data.body, null, 2)}
        </code>
      </pre>
    </>
  )
}
