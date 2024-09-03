import { NextRequest, NextResponse } from "next/server"
import { createRemoteJWKSet, jwtVerify } from "jose"

export const GET = async (req: NextRequest) => {
  const unauthorizedResponse = NextResponse.json(
    {
      message: "Unauthorized",
    },
    {
      status: 401,
    },
  )

  const authorization = req.headers.get("authorization")
  if (!authorization) {
    return unauthorizedResponse
  }
  if (!authorization.startsWith("Bearer ")) {
    return unauthorizedResponse
  }

  const bearerToken = authorization.split(" ")[1]
  const url = new URL(`${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`)
  const JWKS = createRemoteJWKSet(url)

  try {
    const { payload, protectedHeader } = await jwtVerify(bearerToken, JWKS, {
      issuer: process.env.AUTH0_ISSUER_BASE_URL + "/",
      audience: "https://example.com/api/v1/",
    })
    console.log("payload", payload)
    console.log("protectedHeader", protectedHeader)
  } catch (err) {
    console.error(err)
    return unauthorizedResponse
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
