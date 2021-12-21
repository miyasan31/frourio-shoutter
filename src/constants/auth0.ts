import { Auth0Client } from '@auth0/auth0-spa-js'

export const auth0 = new Auth0Client({
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '',
  client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''
})

export const differentAudienceOptions = {
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE_URL || ''
}

export const loginWithRedirectOprions = {
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE_URL || '',
  redirect_uri: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL || ''}/redirect`
}
