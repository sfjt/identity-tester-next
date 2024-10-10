import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  console.log("/api/log", req.body)
  return NextResponse.json(
    {
      message: "OK",
    },
    {
      status: 200,
    },
  )
}
