"use client"

import axios from "axios"
import useSWR from "swr"

async function fetcher(uri: string) {
  const res = await axios.get(uri)
  return {
    status: res.status,
    body: res.data,
  }
}

export default function TestAPIWithSession() {
  const { data, error, isLoading } = useSWR("/api/test/session", fetcher)
  if (error) {
    return <p>Something went wrong.</p>
  }
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!data) {
    return <p>Missing response data.</p>
  }

  return (
    <>
      <pre>
        <code>{data.status}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(data.body, null, 2)}</code>
      </pre>
    </>
  )
}
