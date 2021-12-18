import { useCallback } from 'react'
import { useRouter } from 'next/router'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import { user } from '~/atoms'
import { useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'

export const useIndexHook = () => {
  const router = useRouter()
  const { tweetId } = router.query

  const {
    data: tweetAndReplies,
    error,
    revalidate
  } = useAspidaSWR(apiClient.tweet._tweetId(Number(tweetId)))

  const userInfo = useRecoilValue(user)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  const handlePostTweet = useCallback(
    async (data) => {
      await apiClient.reply.post({
        body: {
          reply: data.reply,
          tweet: { connect: { id: Number(tweetId) } },
          user: { connect: { id: userInfo.id } }
        }
      })
      revalidate()
    },
    [userInfo, tweetId]
  )

  return {
    tweetAndReplies,
    error,
    handlePostTweet,
    register,
    handleSubmit,
    isSubmitting
  }
}
