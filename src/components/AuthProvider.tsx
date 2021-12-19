import { useRouter } from 'next/router'
import React, { FC, useCallback, useEffect } from 'react'
import { auth0 } from '~/constants/auth0'

const differentAudienceOptions = {
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE_URL || ''
}

type Props = {
  children: React.ReactNode
}

export const AuthProvider: FC<Props> = (props) => {
  const router = useRouter()

  const listenAuthState = useCallback(async () => {
    try {
      const result = await auth0.getTokenSilently(differentAudienceOptions)
      if (!result) router.push('/signin')
      else router.push('/')
    } catch (error) {
      router.push('/signin')
    }
  }, [])

  useEffect(() => {
    listenAuthState()
  }, [])

  return <>{props.children}</>
}
