import auth0 from "../../lib/rwa-config"
import { UserProvider } from "@auth0/nextjs-auth0/client"

export default async function RWALayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth0.getSession()
  const accessToken = session?.accessToken || "N/A"
  const idToken = session?.idToken || "N/A"
  const refreshToken = session?.refreshToken || "N/A"

  let sessionInfo = <p>N/A</p>

  if (session) {
    sessionInfo = (
      <div>
        <dl>
          <dt>Access token:</dt>
          <dd>{accessToken}</dd>
          <dt>ID token:</dt>
          <dd>{idToken}</dd>
          <dt>Refresh token:</dt>
          <dd>{refreshToken}</dd>
        </dl>
      </div>
    )
  }

  return (
    <UserProvider>
      <main>
        <h2>Regular Web Application</h2>
        {children}
        <section>
          <h3>Session</h3>
          {sessionInfo}
        </section>
      </main>
    </UserProvider>
  )
}
