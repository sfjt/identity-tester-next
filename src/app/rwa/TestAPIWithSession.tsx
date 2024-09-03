"use client"

import useSWR from "swr"

const fetcher = async (uri: string) => {
  const response = await fetch(uri)
  return {
    status: response.status,
    body: JSON.stringify(await response.json()),
  }
}

export default function TestAPIWithSession() {
  const { data, error } = useSWR("/api/test/session", fetcher)
  if (error) {
    return <p>Something went wrong.</p>
  }
  if (data === undefined) {
    return <p>Loading...</p>
  }

  return (
    <pre>
      <code>
        {data.status} {data.body}
      </code>
    </pre>
  )
}
