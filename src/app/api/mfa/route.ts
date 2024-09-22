import { NextRequest, NextResponse } from "next/server"

import auth0 from "../../../lib/auth0"

export const GET = auth0.withApiAuthRequired(async (req: NextRequest) => {
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

  const res = await fetch(`${process.env.MFA_API_AUDIENCE}authenticators`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const body = await res.json()

  return NextResponse.json(body, {
    status: res.status,
  })
})
