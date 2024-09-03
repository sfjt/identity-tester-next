import qs from "qs"

import auth0 from "../../../../lib/auth0"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { NextApiRequest, NextApiResponse } from "next"
import type { AppRouteHandlerFnContext } from "@auth0/nextjs-auth0"

interface CustomLoginOptions {
  returnTo: string
  authorizationParams: {
    [prop: string]: any
  }
}

interface CustomLogoutOptions {
  returnTo: string
  logoutParams: {
    [prop: string]: any
  }
}

const defaultReturnTo = `${process.env.AUTH0_BASE_URL}/rwa`

const handler = auth0.handleAuth({
  login: auth0.handleLogin((req) => {
    const loginOptions: CustomLoginOptions = {
      returnTo: defaultReturnTo,
      authorizationParams: {},
    }
    if (req.url) {
      const url = new URL(req.url)
      const params = qs.parse(url.searchParams.toString())
      Object.keys(params).forEach((k) => {
        if (typeof params[k] !== "string") {
          return
        }
        if (k === "returnTo") {
          loginOptions.returnTo = params[k]
          return
        }
        loginOptions.authorizationParams[k] = params[k]
      })
    }
    console.log("Login options:", `\n${JSON.stringify(loginOptions, null, 2)}`)
    return loginOptions
  }),
  logout: auth0.handleLogout((req) => {
    const logoutOptions: CustomLogoutOptions = {
      returnTo: defaultReturnTo,
      logoutParams: {},
    }
    if (req.url) {
      const url = new URL(req.url)
      const params = qs.parse(url.searchParams.toString())
      Object.keys(params).forEach((k) => {
        if (typeof params[k] !== "string") {
          return
        }
        if (k === "returnTo") {
          logoutOptions.returnTo = params[k]
          return
        }
        logoutOptions.logoutParams[k] = params[k]
      })
    }
    console.log("Logout options:", `\n${JSON.stringify(logoutOptions, null, 2)}`)
    return logoutOptions
  }),
  callback: async (req: NextRequest | NextApiRequest, res: NextApiResponse | AppRouteHandlerFnContext) => {
    try {
      return await auth0.handleCallback(req, res)
    } catch (err) {
      if (req.url) {
        const url = new URL(req.url)
        const params = qs.parse(url.searchParams.toString())
        const { error, error_description } = params
        return NextResponse.json(
          {
            message: "Error while handling callback",
            error,
            error_description,
          },
          {
            status: 400,
          },
        )
      }
    }
  },
})

export { handler as GET, handler as POST }
