import React, { useCallback } from 'react'
import { apiClient } from '~/utils/apiClient'
import { Box, Button, Textarea } from '@chakra-ui/react'
import { user } from '~/atoms'
import { useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'
import { useGetAccessToken } from '~/hooks/useGetAccessToken'

export const TweetForm = () => {
  const userInfo = useRecoilValue(user)
  const { token } = useGetAccessToken()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  const handlePostTweet = useCallback(
    async (data) => {
      await apiClient.tweet.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          tweet: data.tweet,
          user: { connect: { id: userInfo.id } }
        }
      })
    },
    [userInfo, token]
  )

  return (
    <Box bg="blue.100" p="1rem">
      <form onSubmit={handleSubmit(handlePostTweet)}>
        <Textarea
          {...register('tweet')}
          placeholder="ツイートする"
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
