import auth0 from "../../../../lib/rwa-config"

const auth0Server = auth0()

export const GET = auth0Server.handleAuth({
  login: auth0Server.handleLogin(() => {
    return {
      returnTo: `${process.env.AUTH0_BASE_URL}/rwa`,
    }
  }),
  logout: auth0Server.handleLogout(() => {
    return {
      returnTo: `${process.env.AUTH0_BASE_URL}/rwa`,
    }
  }),
})
