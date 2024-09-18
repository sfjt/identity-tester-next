import React from "react"
import auth0 from "../../lib/auth0"

export default async function MFAPage() {
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

  const resp = await fetch(`${process.env.MFA_API_AUDIENCE}authenticators`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const data: any = await resp.json()

  if (resp.status !== 200) {
    return (
      <>
        <pre>
          <code>{resp.status}</code>
        </pre>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </>
    )
  }

  return (
    <dl>
      {Array.isArray(data) &&
        data.map((authenticator) => {
          if (typeof authenticator.id !== "string") {
            return <></>
          }
          return (
            <React.Fragment key={authenticator.id}>
              <dt>
                {authenticator.id} <a href={`/mfa/delete/${authenticator.id}`}>DELETE</a>
              </dt>
              <dd>Type: {authenticator.authenticator_type}</dd>
              {authenticator?.oob_channel && <dd>OOB Channel: {authenticator.oob_channel}</dd>}
              <dd>Active: {authenticator?.active ? "True" : "False"}</dd>
            </React.Fragment>
          )
        })}
    </dl>
  )
}
