import { auth0 } from '~/constants'

// ログアウト処理
export const handleSignout = async () => {
  auth0.logout({
    returnTo: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL || ''}/signin`
  })
}
