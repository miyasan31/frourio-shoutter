import React, { FC, useEffect } from 'react'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import { useRecoilState } from 'recoil'
import { user } from '~/atoms'

type Props = {
  children: React.ReactNode
}

export const AuthProvider: FC<Props> = (props) => {
  const { data: authUser } = useAspidaSWR(
    apiClient.user._userId('miyasan_0301')
  )

  const [userInfo, setUserInfo] = useRecoilState(user)

  useEffect(() => {
    if (authUser) {
      setUserInfo({
        id: authUser.id,
        name: authUser.name,
        profile: authUser.profile,
        createdAt: authUser.createdAt,
        isSignin: true
      })
    }
  }, [authUser])

  return (
    <>
      {userInfo.isSignin ? (
        <div>{props.children}</div>
      ) : (
        <div>ログインしてください</div>
      )}
    </>
  )
}
