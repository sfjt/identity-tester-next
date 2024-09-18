import { UserProvider } from "@auth0/nextjs-auth0/client"
import UserInfo from "./UserInfo"

export default function ProtectedClientComponent() {
  return (
    <UserProvider>
      <main>
        <h2>Regular Web Application - Protected Client Component</h2>
        <UserInfo />
      </main>
    </UserProvider>
  )
}
