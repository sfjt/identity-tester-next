import auth0 from "../../../../lib/auth0"

export default async function MFADeletePage({ params }: { params: { id: string } }) {
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

  const resp = await fetch(`${process.env.MFA_API_AUDIENCE}authenticators/${params.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (resp.status === 204) {
    return (
      <>
        <pre>
          <code>
            {resp.status} {resp.statusText}
          </code>
        </pre>
        <p>
          <a href="/mfa">/mfa</a>
        </p>
      </>
    )
  }

  return (
    <>
      <pre>
        <code>{resp.status}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(await resp.json(), null, 2)}</code>
      </pre>
      <p>
        <a href="/mfa">/mfa</a>
      </p>
    </>
  )
}
