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
    const res = await fetch(`${process.env.AUTH0_BASE_URL}/api/test/jwt`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return (
      <p>
        <code>
          {res.status} {res.statusText}
        </code>
      </p>
    )
  } catch (err) {
    return <p>Something went wrong.</p>
  }
}
