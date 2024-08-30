import { Auth0Server, initAuth0 } from '@auth0/nextjs-auth0';
import config from './rwa-config';

let _auth0ServerInstance: Auth0Server;

export default function auth0() {
  if (!_auth0ServerInstance) {
    _auth0ServerInstance = initAuth0(config);
  }
  return _auth0ServerInstance;
}
