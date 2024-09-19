import { NextRequest, NextResponse } from "next/server"

import auth0 from "../../../../../lib/auth0"
import axios from "axios"

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

  const resp = await axios.delete(`${process.env.MFA_API_AUDIENCE}authenticators/${params.id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (resp.status === 204) {
    return new Response(null, {
      status: resp.status,
    })
  }

  return NextResponse.json(
    {
      data: resp.data,
    },
    {
      status: resp.status,
    },
  )
}
