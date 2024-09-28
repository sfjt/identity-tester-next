import auth0 from "@/lib/auth0"
import LoginAndOut from "./LoginAndOut"
import TestAPIWithSession from "./TestAPIWithSession"
import TestAPIWithJwt from "./TestAPIWithJWT"

export default async function Page() {
  const session = await auth0().getSession()
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

  return (
    <main>
      <h2>Regular Web Application</h2>
      <section>
        <h3>Login and logout</h3>
        <LoginAndOut />
      </section>
      <section>
        <h3>Protected Routes</h3>
        <ul>
          <li>
            <a href="/rwa/protected/server">Protected Server Component</a>
          </li>
          <li>
            <a href="/rwa/protected/client">Protected Client Component</a>
          </li>
        </ul>
      </section>
      <section>
        <h3>Protected APIs</h3>
        <h4>GET /api/test/session</h4>
        <TestAPIWithSession />
        <h4>GET /api/test/jwt</h4>
        <TestAPIWithJwt />
        <p>
          <a href={"/api/auth/login?" + new URLSearchParams({ audience: "https://example.com/api/v1/" })}>
            Get Access Token
          </a>
        </p>
      </section>
      <section>
        <h3>Session Details</h3>
        {sessionInfo}
      </section>
    </main>
  )
}
