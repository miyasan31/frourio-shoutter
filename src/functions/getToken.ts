import { auth0, differentAudienceOptions } from '~/constants'

// token取得処理
export const getToken = async () => {
  return await auth0.getTokenSilently(differentAudienceOptions)
}
