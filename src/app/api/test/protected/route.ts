import auth0 from "../../../../lib/auth0"
import { NextRequest } from "next/server"

export const GET = auth0.withApiAuthRequired((req: NextRequest) => {
  const res = Response.json(
    {
      message: "OK",
    },
    {
      status: 200,
    },
  )
  return res
})
