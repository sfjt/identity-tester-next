import qs from "qs"

import auth0 from "../../../../lib/rwa-config"

interface _LoginOptions {
  returnTo: string
  authorizationParams: {
    [prop: string]: any
  }
}

interface _LogoutOptions {
  returnTo: string
  logoutParams: {
    [prop: string]: any
  }
}

const defaultReturnTo = `${process.env.AUTH0_BASE_URL}/rwa`

const auth0Server = auth0()
const handler = auth0Server.handleAuth({
  login: auth0Server.handleLogin((req) => {
    const loginOptions: _LoginOptions = {
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
    console.log("Login options:", loginOptions)
    return loginOptions
  }),
  logout: auth0Server.handleLogout((req) => {
    const logoutOptions: _LogoutOptions = {
      returnTo: defaultReturnTo,
      logoutParams: {},
    }
    if (req.url) {
      const url = new URL(req.url)
      const params = qs.parse(url.searchParams.toString())
      console.log(req.url)
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
    console.log("Logout options:", logoutOptions)
    return logoutOptions
  }),
})

export const GET = handler
export const POST = handler
