"use client"

import React from "react"
import axios from "axios"
import useSWR from "swr"

import styles from "../mfa/mfa.module.css"

async function fetcher(uri: string) {
  const res = await axios.get(uri)
  return {
    status: res.status,
    authenticators: res.data.data,
  }
}

export default function MFAPage() {
  const {data, error, isLoading, mutate} = useSWR("/api/mfa", fetcher)

  function deleteEventHandlerFactory(id: string) {
    return async () => {
      const res = await axios.delete(`/api/mfa/delete/${id}`)
      if(res.status === 204) {
        mutate()
        return
      }
      console.error("Error while deleting authenticatior", res)
    }
  }

  if(error?.response) {
    return (
      <pre>
        <code>
          {error.response?.status} {error.response?.data?.message}
        </code>
      </pre>
    )
  }
  if (error) {
    return <p>Something went wrong.</p>
  }
  if (isLoading || !data) {
    return <p>Loading...</p>
  }

  let authenticatorsList: React.JSX.Element[] = []
  if(Array.isArray(data.authenticators)) {
    authenticatorsList = data.authenticators.map((a, i) => {
      const key = `${i}-${a.id}`
      if(!a.id) {
        return <></>
      }
      return (
        <React.Fragment key={key}>
          <dt>
            {a.id} <button className={styles["authenticator-delete-button"]} onClick={deleteEventHandlerFactory(a.id)}>DELETE</button>
          </dt>
          <dd>authenticator_type: {a.authenticator_type}</dd>
          {a.oob_channel &&
            <dd>oob_channel: {a.oob_channel}</dd>
          }
          <dd>active: {a.active ? "True" : "False"}</dd>
        </React.Fragment>
      )
    })
  }

  return(
    <section>
      <h3>Authenticators</h3>
      <dl>
        {authenticatorsList}
      </dl>
    </section>
  )
}