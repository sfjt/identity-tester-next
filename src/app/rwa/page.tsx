"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import { ChangeEvent, useState } from "react"

export default function RWAPage() {
  const [state, setState] = useState({
    loginParams: {},
    logoutParams: {},
  })
  const { user, error, isLoading } = useUser()

  function login() {
    let href = "/api/auth/login"
    if (Object.keys(state.loginParams).length) {
      const params = new URLSearchParams(state.loginParams).toString()
      href += `?${params}`
    }
    window.location.href = href
  }

  function logout() {
    let href = "/api/auth/logout"
    if (Object.keys(state.logoutParams).length) {
      const params = new URLSearchParams(state.logoutParams).toString()
      href += `?${params}`
    }
    window.location.href = href
  }

  function parseLoginParams(event: ChangeEvent<HTMLTextAreaElement>) {
    const v = event.target.value
    if (!v) {
      return
    }

    let j = {}
    try {
      j = JSON.parse(v)
    } catch (err) {
      event.target.style.borderColor = "red"
      if (Object.keys(state.loginParams).length) {
        setState({
          ...state,
          loginParams: {},
        })
      }
      return
    }
    event.target.style.borderColor = "green"
    setState({
      ...state,
      loginParams: j,
    })
  }

  function parseLogoutParams(event: ChangeEvent<HTMLTextAreaElement>) {
    const v = event.target.value
    if (!v) {
      return
    }

    let j = {}
    try {
      j = JSON.parse(v)
    } catch (err) {
      event.target.style.borderColor = "red"
      if (Object.keys(state.logoutParams).length) {
        setState({
          ...state,
          logoutParams: {},
        })
      }
      return
    }
    event.target.style.borderColor = "green"
    setState({
      ...state,
      logoutParams: j,
    })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <p>
              <button onClick={login}>Login</button>
            </p>
            <p>
              <textarea
                onChange={parseLoginParams}
                rows={10}
                cols={50}
              ></textarea>
            </p>
          </li>

          <li>
            <p>
              <button onClick={logout}>Logout</button>
            </p>
            <p>
              <textarea
                onChange={parseLogoutParams}
                rows={10}
                cols={50}
              ></textarea>
            </p>
          </li>
        </ul>
      </nav>
      <section>
        <h3>User</h3>
        <p>{user?.email || "N/A"}</p>
      </section>
    </>
  )
}
