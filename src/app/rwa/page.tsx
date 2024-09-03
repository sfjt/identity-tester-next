import auth0 from "../../lib/auth0"
import LoginAndOut from "./LoginAndOut"

export default async function RWAPage() {
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
    <>
      <header>
        <h2>Regular Web Application</h2>
        <nav>
          <h3>Login and logout</h3>
          <LoginAndOut />
          <h3>Protected Routes</h3>
          <ul>
            <li>
              <a href="/rwa/protected/server">Protected Server Component</a>
            </li>
            <li>
              <a href="/rwa/protected/server">Protected Client Component</a>
            </li>
            <li>
              <a href="/api/test/protected">Protected API</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h3>Session Details</h3>
          {sessionInfo}
        </section>
      </main>
    </>
  )
}
