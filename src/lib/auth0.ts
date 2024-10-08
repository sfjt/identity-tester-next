import { initAuth0 } from "@auth0/nextjs-auth0"
import type { SessionStorePayload, SessionStore, ConfigParameters, Auth0Server } from "@auth0/nextjs-auth0"
import { Redis } from "@upstash/redis"

class Store implements SessionStore {
  private redis: Redis
  constructor() {
    this.redis = Redis.fromEnv()
  }
  get(id: string) {
    return this.redis.get<SessionStorePayload>(id)
  }
  async set(id: string, val: SessionStorePayload) {
    const expiryMs = val.header.exp * 1000
    await this.redis.set<SessionStorePayload>(id, val, { pxat: expiryMs })
  }
  async delete(id: string) {
    await this.redis.del(id)
  }
}

const config: ConfigParameters = {
  session: {
    store: new Store(),
  },
  backchannelLogout: true,
}

let _server: Omit<Auth0Server, "withMiddlewareAuthRequired"> | undefined = undefined

export default function auth0() {
  if (!_server) {
    _server = initAuth0(config)
  }
  return _server
}
