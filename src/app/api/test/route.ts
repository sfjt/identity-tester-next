import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "../../../lib/rwa-config"

export const GET = auth0.withApiAuthRequired((req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({"message": "authorized"})
})
