import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "../../../lib/auth0"

export const GET = auth0().withApiAuthRequired((req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({"message": "authorized"})
})
