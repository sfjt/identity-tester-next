import { GetAccessTokenResult } from "@auth0/nextjs-auth0"
import auth0 from "../../lib/auth0"

export default async function TestAPIWithJwt() {
  const missingAccessTokenResult = <p>Missing access token.</p>
  let accessToken = ""
  try {
    const getAccessTokenResult = await auth0.getAccessToken()
    accessToken = getAccessTokenResult.accessToken || ""
  } catch (err) {
    console.error(err)
    return missingAccessTokenResult
  }

  if (!accessToken) {
    return missingAccessTokenResult
  }

  try {
    const resp = await fetch(`${process.env.AUTH0_BASE_URL}/api/test/jwt`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = JSON.stringify(await resp.json(), null, 2)
    return (
      <>
        <pre>
          <code>{resp.status}</code>
        </pre>
        <pre>
          <code>{data}</code>
        </pre>
      </>
    )
  } catch (err) {
    return <p>Something went wrong.</p>
  }
}
