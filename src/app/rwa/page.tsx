"use client"
import { useUser } from "@auth0/nextjs-auth0/client"

export default function RWAPage() {
  const { user, error, isLoading } = useUser()

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <section>
      <h3>User</h3>
      <p>{user?.email || "N/A"}</p>
    </section>
  )
}
