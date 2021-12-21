import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import { auth0 } from '~/constants/auth0'

const differentAudienceOptions = {
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE_URL || ''
}

export const useGetAccessToken = () => {
  const router = useRouter()
  const [token, setToken] = useState('')

  const listenAuthState = useCallback(async () => {
    try {
      // アクセストークン(JWT)
      if (router.pathname !== '/signin') {
        const accessToken = await auth0.getTokenSilently(
          differentAudienceOptions
        )
        // console.log('accessToken', accessToken)
        setToken(accessToken)

        // ユーザー情報
        // const user = await auth0.getUser(differentAudienceOptions)
        // console.log('user', user)

        // const claims = await auth0.getIdTokenClaims(differentAudienceOptions)
        // ユーザー情報とIdTokenが取れる
        // console.log('claims', claims)
        // デコードするとユーザー情報が取れる
        // console.log(',claims?.__raw', claims?.__raw)
      }
    } catch (error) {
      router.push('/signin')
    }
  }, [router])

  useEffect(() => {
    listenAuthState()
  }, [])

  return { token }
}

const loginWithRedirectOprions = {
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE_URL || '',
  redirect_uri: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL || ''}/redirect`
}

// ログイン処理
export const handleSignin = async () => {
  await auth0.loginWithRedirect(loginWithRedirectOprions)
}

// ログアウト処理
export const handleSignout = async () => {
  auth0.logout({
    returnTo: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL || ''}/signin`
  })
}

// token取得処理
export const getToken = async () => {
  return await auth0.getTokenSilently(differentAudienceOptions)
}
