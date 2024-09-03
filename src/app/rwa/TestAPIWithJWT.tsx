import { GetAccessTokenResult } from "@auth0/nextjs-auth0"
import auth0 from "../../lib/auth0"

export default async function TestAPIWithJwt() {
  let accessToken: GetAccessTokenResult | null = null
  try {
    accessToken = await auth0.getAccessToken()
  } catch (err) {
    return <p>N/A</p>
  }

  if (!accessToken.accessToken) {
    return <p>N/A</p>
  }

  try {
    const resp = await fetch(`${process.env.AUTH0_BASE_URL}/api/test/jwt`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken.accessToken}`,
      },
    })
    const data = JSON.stringify(await resp.json())
    return (
      <>
        <pre>
          <code>
            {resp.status} {data}
          </code>
        </pre>
      </>
    )
  } catch (err) {
    return <p>Something went wrong.</p>
  }
}
