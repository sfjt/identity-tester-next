import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  console.log("/api/log", await req.text())
  return NextResponse.json(
    {
      message: "OK",
    },
    {
      status: 200,
    },
  )
}
