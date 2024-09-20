"use client"

import React from "react"
import useSWR from "swr"

import styles from "../mfa/mfa.module.css"

async function fetchAuthenticators(uri: string) {
  const res = await fetch(uri)
  const { body } = await res.json()
  return {
    status: res.status,
    body,
  }
}

export default function MFAPage() {
  const { data, error, isLoading, mutate } = useSWR("/api/mfa", fetchAuthenticators)

  function deleteEventHandlerFactory(id: string) {
    return async () => {
      const res = await fetch(`/api/mfa/delete/${id}`, {
        method: "delete",
      })
      if (res.status === 204) {
        mutate()
        return
      }
      console.error("Could not delete authenticator", res)
    }
  }
  if (error) {
    return <p>Something went wrong.</p>
  }
  if (isLoading || !data) {
    return <p>Loading...</p>
  }
  console.log(data.body)
  let authenticatorsList: React.JSX.Element[] = []
  if (Array.isArray(data.body)) {
    authenticatorsList = data.body.map((a, i) => {
      const key = `${i}-${a.id}`
      if (!a.id) {
        return <></>
      }
      return (
        <React.Fragment key={key}>
          <dt>
            {a.id}{" "}
            <button className={styles["authenticator-delete-button"]} onClick={deleteEventHandlerFactory(a.id)}>
              DELETE
            </button>
          </dt>
          <dd>authenticator_type: {a.authenticator_type}</dd>
          {a.oob_channel && <dd>oob_channel: {a.oob_channel}</dd>}
          <dd>active: {a.active ? "True" : "False"}</dd>
        </React.Fragment>
      )
    })
  }

  return (
    <>
      <section>
        <h3>Enroll</h3>
        <ul>
          <li>
            <a href="/mfa/enroll/otp">OTP</a>
          </li>
        </ul>
      </section>
      <section>
        <h3>Authenticators</h3>
        <dl>{authenticatorsList}</dl>
      </section>
    </>
  )
}
