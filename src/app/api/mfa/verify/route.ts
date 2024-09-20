import { NextRequest, NextResponse } from "next/server"

import auth0 from "../../../../lib/auth0"

export async function POST(req: NextRequest) {
  if (!process.env.MFA_API_AUDIENCE) {
    NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    )
  }
  const unauthorizedResult = NextResponse.json(
    {
      message: "Unauthorized",
    },
    {
      status: 401,
    },
  )
  let accessToken = ""
  try {
    const getAccessTokenResult = await auth0.getAccessToken()
    accessToken = getAccessTokenResult.accessToken || ""
  } catch (err) {
    console.error(err)
    return unauthorizedResult
  }

  if (!accessToken) {
    return unauthorizedResult
  }

  const otp = (await req.json()).otp
  const res = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "http://auth0.com/oauth/grant-type/mfa-otp",
      client_id: process.env.AUTH0_CLIENT_ID || "",
      mfa_token: accessToken,
      client_secret: process.env.AUTH0_CLIENT_SECRET || "",
      otp,
    }),
  })

  const body = await res.json()

  return NextResponse.json(
    {
      body,
    },
    {
      status: res.status,
    },
  )
}
