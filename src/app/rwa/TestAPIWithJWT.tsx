import axios from "axios"

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
    const resp = await axios.get(`${process.env.AUTH0_BASE_URL}/api/test/jwt`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return (
      <>
        <pre>
          <code>{resp.status}</code>
        </pre>
        <pre>
          <code>{JSON.stringify(resp.data, null, 2)}</code>
        </pre>
      </>
    )
  } catch (err) {
    return <p>Something went wrong.</p>
  }
}
