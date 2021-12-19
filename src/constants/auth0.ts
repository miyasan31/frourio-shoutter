import { Auth0Client } from '@auth0/auth0-spa-js'
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '~/constants/envValue'

export const auth0 = new Auth0Client({
  domain: AUTH0_DOMAIN,
  client_id: AUTH0_CLIENT_ID
})
