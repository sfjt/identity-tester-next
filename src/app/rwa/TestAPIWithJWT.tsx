import { GetAccessTokenResult } from "@auth0/nextjs-auth0"
import auth0 from "../../lib/auth0"

export default async function TestAPIWithJwt() {
  let accessToken: GetAccessTokenResult | null = null
  try {
    accessToken = await auth0.getAccessToken()
  } catch (err) {
    return <p>Missing access token</p>
  }

  if (!accessToken.accessToken) {
    return <p>Missing access token</p>
  }

  try {
    const resp = await fetch(`${process.env.AUTH0_BASE_URL}/api/test/jwt`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken.accessToken}`,
      },
    })
    const data = JSON.stringify(await resp.json(), null, 2)
    return (
      <>
        <pre>
          <code>
            {resp.status}
          </code>
        </pre>
        <pre>
          <code>
            {data}
          </code>
        </pre>
      </>
    )
  } catch (err) {
    return <p>Something went wrong.</p>
  }
}
