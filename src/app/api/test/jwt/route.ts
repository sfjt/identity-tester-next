import { NextRequest, NextResponse } from "next/server"
import { createRemoteJWKSet, jwtVerify } from "jose"

export const GET = async (req: NextRequest) => {
  const forbiddenResponse = NextResponse.json(
    {
      message: "Forbidden",
    },
    {
      status: 403,
    },
  )

  const authorization = req.headers.get("authorization")
  if (!authorization) {
    return forbiddenResponse
  }
  if (!authorization.startsWith("Bearer ")) {
    return forbiddenResponse
  }

  const bearerToken = authorization.split(" ")[1]
  const url = new URL(`${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`)
  const JWKS = createRemoteJWKSet(url)

  try {
    await jwtVerify(bearerToken, JWKS, {
      issuer: process.env.AUTH0_ISSUER_BASE_URL + "/",
      audience: "https://example.com/api/v1/",
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    )
  }

  return NextResponse.json(
    {
      message: "OK",
    },
    {
      status: 200,
    },
  )
}
