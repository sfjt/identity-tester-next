import { NextRequest, NextResponse } from "next/server"

import auth0 from "@/lib/auth0"

export const GET = auth0().withApiAuthRequired((req: NextRequest) => {
  return NextResponse.json(
    {
      message: "OK",
    },
    {
      status: 200,
    },
  )
})
