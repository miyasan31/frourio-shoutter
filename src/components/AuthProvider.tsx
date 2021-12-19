import React, { FC, useEffect } from 'react'
// import useAspidaSWR from '@aspida/swr'
// import { apiClient } from '~/utils/apiClient'
// import { useRecoilState } from 'recoil'
// import { user } from '~/atoms'
// import { useGetAccessToken } from '~/hooks/useGetAccessToken'
// import { auth0 } from '~/constants/auth0'

type Props = {
  children: React.ReactNode
}

export const AuthProvider: FC<Props> = (props) => {
  // const [userInfo, setUserInfo] = useRecoilState(user)
  // const { token } = useGetAccessToken()

  // const { data: authUser } = useAspidaSWR(
  //   apiClient.user._userId('miyasan_0301'),
  //   {
  //     headers: { authorization: `Bearer ${token}` },
  //     enabled: !!token
  //   }
  // )

  // useEffect(() => {
  //   if (authUser) {
  //     setUserInfo({
  //       id: authUser.id,
  //       name: authUser.name,
  //       profile: authUser.profile,
  //       createdAt: authUser.createdAt,
  //       isSignin: true
  //     })
  //   }
  // }, [authUser])

  return <>{props.children}</>
}
