import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useCallback, useEffect } from 'react'
import { auth0 } from '~/constants'
import { apiClient } from '~/utils'
import { useSetRecoilState } from 'recoil'
import { user } from '~/atoms'
import { Progress } from '~/components'

const differentAudienceOptions = {
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE_URL || ''
}

const CallbackPage: NextPage = () => {
  const router = useRouter()
  const setUserInfo = useSetRecoilState(user)

  const listenAuthState = useCallback(async () => {
    try {
      // トークンを取得
      const token = await auth0.getTokenSilently(differentAudienceOptions)

      // トークンが取得できたらデータベースにユーザー情報が存在するか確認
      if (token) {
        // 認証ユーザー情報を取得
        const user = await auth0.getUser(differentAudienceOptions)
        // ユーザー情報がデータベースに存在するか確認
        const result = await apiClient.user._email(user?.email || '').get({
          headers: { authorization: `Bearer ${token}` }
        })

        // ユーザー情報が存在しなかったらサインアップ画面にリダイレクト
        if (!result.body.user) {
          router.push('/signup')
        } else {
          // ユーザー情報が存在したらユーザー情報をセット
          setUserInfo({
            ...result.body.user,
            isSignin: true
          })
          router.push('/')
        }
      }
    } catch (e) {
      router.push('/signin')
    }
  }, [])

  useEffect(() => {
    listenAuthState()
  }, [])

  return <Progress h="200px" />
}

export default CallbackPage
