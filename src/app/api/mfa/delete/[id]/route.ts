import { NextRequest, NextResponse } from "next/server"

import auth0 from "../../../../../lib/auth0"

export const DELETE = auth0.withApiAuthRequired(async (req: NextRequest, ctx) => {
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

  const authenticatorId = ctx.params?.id
  if (typeof authenticatorId !== "string") {
    return NextResponse.json(
      {
        message: "Bad Request",
      },
      {
        status: 400,
      },
    )
  }

  const res = await fetch(`${process.env.MFA_API_AUDIENCE}authenticators/${authenticatorId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (res.status === 204) {
    return new Response(null, {
      status: res.status,
    })
  }

  const body = res.json()

  return NextResponse.json(body, {
    status: res.status,
  })
})
