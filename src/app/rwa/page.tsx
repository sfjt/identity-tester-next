"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import { ChangeEvent, useState } from "react"

import "./rwa.css"
import styles from "./rwa.module.css"

export default function RWAPage() {
  const [state, setState] = useState({
    customParams: "",
    customParamsEnabled: false,
  })
  const { user, error, isLoading } = useUser()

  function login() {
    window.location.href = addParams("/api/auth/login")
  }

  function logout() {
    window.location.href = addParams("/api/auth/logout")
  }

  function addParams(href: string) {
    if (state.customParamsEnabled && state.customParams) {
      return `${href}?${state.customParams}`
    }
    return href
  }

  function toggleCustomParams() {
    setState({
      ...state,
      customParamsEnabled: !state.customParamsEnabled,
    })
  }

  function parseCustomParams(event: ChangeEvent<HTMLTextAreaElement>) {
    const v = event.target.value
    if (!v) {
      return
    }

    let j = {}
    try {
      j = JSON.parse(v)
    } catch (err) {
      setState({
        ...state,
        customParams: "",
      })
      return
    }
    const params = new URLSearchParams(j).toString()
    setState({
      ...state,
      customParams: params,
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
          </li>
          <li>
            <p>
              <button onClick={logout}>Logout</button>
            </p>
          </li>
          <li>
            <div>
              <label
                onClick={toggleCustomParams}
                htmlFor="custom-params"
                className={styles["custom-params-label"]}
              >
                <button>
                  {state.customParamsEnabled ? "-" : "+"} Custom login/logout
                  params
                </button>
              </label>
              <div
                className={
                  state.customParamsEnabled
                    ? ""
                    : styles["custom-params-hidden"]
                }
              >
                <p>
                  <textarea
                    onChange={parseCustomParams}
                    rows={10}
                    cols={50}
                    id="custom-params"
                  >{`{\n  \n}`}</textarea>
                </p>
                {state.customParams ? (
                  <p className={styles["custom-params-valid"]}>
                    {state.customParams}
                  </p>
                ) : (
                  <p className={styles["custom-params-invalid-or-empty"]}>
                    {"(Invalid or empty JSON)"}
                  </p>
                )}
              </div>
            </div>
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
