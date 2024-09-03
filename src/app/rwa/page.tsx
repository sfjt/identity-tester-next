import auth0 from "../../lib/auth0"
import LoginAndOut from "./LoginAndOut"

export default async function RWAPage() {
  const session = await auth0.getSession()
  const accessToken = session?.accessToken
  const idToken = session?.idToken
  const refreshToken = session?.refreshToken

  let sessionInfo = <p>N/A</p>

  if (session) {
    sessionInfo = (
      <div>
        <dl>
          <dt>Access token:</dt>
          <dd>{accessToken || "N/A"}</dd>
          <dt>ID token:</dt>
          <dd>{idToken || "N/A"}</dd>
          <dt>Refresh token:</dt>
          <dd>{refreshToken || "N/A"}</dd>
        </dl>
      </div>
    )
  }

  let apiResponse = <p>N/A</p>
  if (accessToken) {
    try {
      const resp = await fetch(`${process.env.AUTH0_BASE_URL}/api/test/jwt`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const data = JSON.stringify(await resp.json())
      apiResponse = (
        <pre>
          <code>
            {resp.status} {data}
          </code>
        </pre>
      )
    } catch (err) {
      console.error(err)
      apiResponse = <p>Something went wrong.</p>
    }
  }

  const loginWithAudienceUrl = "/api/auth/login?" + (new URLSearchParams({audience: "https://example.com/api/v1/"}))

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
              <a href="/rwa/protected/client">Protected Client Component</a>
            </li>
            <li>
              <a href="/api/test/protected">Protected API (Session)</a>
            </li>
          </ul>
          <h4>Response From Protected API (JWT):</h4>
          <p><code>GET /api/test/jwt</code></p>
          {apiResponse}
          <p><a href={loginWithAudienceUrl}>Get Access Token</a></p>
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
