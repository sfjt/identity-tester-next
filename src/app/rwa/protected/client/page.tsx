import { UserProvider } from "@auth0/nextjs-auth0/client"
import UserInfo from "./UserInfo"

export default function ProtectedClientComponent() {
  return (
    <>
      <header>
        <h2>Regular Web Application - Protected Client Component</h2>
      </header>
      <UserProvider>
        <section>
          <UserInfo />
        </section>
      </UserProvider>
    </>
  )
}
