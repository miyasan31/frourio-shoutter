import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { Box, Button, Textarea } from '@chakra-ui/react'
import { apiClient } from '~/utils'
import { auth0 } from '~/constants'
import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { user } from '~/atoms'

const differentAudienceOptions = {
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE_URL || ''
}

const SignupPage = () => {
  const router = useRouter()
  const setUserInfo = useSetRecoilState(user)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  const handlePostTweet = useCallback(async (data) => {
    try {
      // 認証ユーザー情報を取得
      const user = await auth0.getUser(differentAudienceOptions)
      // トークンを取得
      const token = await auth0.getTokenSilently(differentAudienceOptions)

      const result = await apiClient.user.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          ...data, // id, name, profile
          email: user?.email || '',
          icon: user?.picture || ''
        }
      })

      setUserInfo({
        ...result.body,
        isSignin: true
      })

      router.push('/signup/follow')
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <Box bg="blue.100" p="1rem">
      <form onSubmit={handleSubmit(handlePostTweet)}>
        <Textarea
          {...register('id')}
          placeholder="ユーザーID"
          size="sm"
          bg="white"
        />
        <Textarea
          {...register('name')}
          placeholder="ユーザー名"
          size="name"
          bg="white"
        />
        <Textarea
          {...register('profile')}
          placeholder="プロフィール"
          size="sm"
          bg="white"
        />
        <Button
          type="submit"
          colorScheme="blue"
          mt="1rem"
          rounded="full"
          isLoading={isSubmitting}
        >
          ツイート
        </Button>
      </form>
    </Box>
  )
}

export default SignupPage
