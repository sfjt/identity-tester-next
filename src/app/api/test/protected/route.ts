import { NextRequest, NextResponse } from "next/server"

import auth0 from "../../../../lib/auth0"

export const GET = auth0.withApiAuthRequired((req: NextRequest) => {
  const res = NextResponse.json(
    {
      message: "OK",
    },
    {
      status: 200,
    },
  )
  return res
})
