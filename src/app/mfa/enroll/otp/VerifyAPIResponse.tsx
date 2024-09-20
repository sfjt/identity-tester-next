"use client"

import { useState } from "react"

export default function VerifyAPIResponse() {
  const [state, setState] = useState({
    status: 0,
    statusText: "N/A",
  })

  async function verifyOtp(data: FormData) {
    const otp = data.get("otp")
    const res = await fetch("/api/mfa/verify", {
      method: "post",
      body: JSON.stringify({
        otp,
      }),
    })
    setState({
      status: res.status,
      statusText: res.statusText,
    })
  }

  return (
    <section>
      <h3>Verify OTP</h3>
      <form action={verifyOtp}>
        <input name="otp" />
        <button>Verify</button>
      </form>
      {state.status > 0 && (
        <pre>
          <code>
            {state.status} {state.statusText}
          </code>
        </pre>
      )}
    </section>
  )
}
