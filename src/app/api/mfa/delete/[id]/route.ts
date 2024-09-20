import { NextRequest, NextResponse } from "next/server"

import auth0 from "../../../../../lib/auth0"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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

  const res = await fetch(`${process.env.MFA_API_AUDIENCE}authenticators/${params.id}`, {
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

  return NextResponse.json(
    {
      body
    },
    {
      status: res.status,
    },
  )
}
