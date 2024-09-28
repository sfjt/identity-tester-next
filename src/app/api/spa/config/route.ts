import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL || ""
  const domain = issuerBaseUrl.replace("https://", "")
  return NextResponse.json(
    {
      domain,
      client_id: process.env.SPA_CLIENT_ID,
    },
    {
      status: 200,
    },
  )
}
