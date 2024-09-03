import auth0 from "../../../../lib/auth0"

export default auth0.withPageAuthRequired(async () => {
  const session = await auth0.getSession()
  let userInfo = <p>N/A</p>
  if (session) {
    const { user } = session
    user
    userInfo = (
      <dl>
        <dt>Sub:</dt>
        <dd>{user.sub || "N/A"}</dd>
        <dt>Email:</dt>
        <dd>{user.email || "N/A"}</dd>
      </dl>
    )
  }

  return (
    <>
      <header>
        <h2>Regular Web Application - Protected Server Component</h2>
      </header>
      <section>
        <p>Authenticated.</p>
        {userInfo}
      </section>
    </>
  )
})
