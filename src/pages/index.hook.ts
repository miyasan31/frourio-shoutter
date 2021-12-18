import { useCallback } from 'react'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import { user } from '~/atoms'
import { useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'

export const useIndexPage = () => {
  const { data: tweetList, error, revalidate } = useAspidaSWR(apiClient.tweet)

  const userInfo = useRecoilValue(user)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  const handlePostTweet = useCallback(
    async (data) => {
      await apiClient.tweet.post({
        body: {
          tweet: data.tweet,
          user: { connect: { id: userInfo.id } }
        }
      })
      revalidate()
    },
    [userInfo]
  )

  const handllePostLike = useCallback(
    (id) => {
      apiClient.like.post({
        body: {
          tweet: { connect: { id } },
          user: { connect: { id: userInfo.id } }
        }
      })
      revalidate()
    },
    [userInfo]
  )

  const handllePostRetweet = useCallback(
    (id) => {
      apiClient.retweet.post({
        body: {
          tweet: { connect: { id } },
          user: { connect: { id: userInfo.id } }
        }
      })
      revalidate()
    },
    [userInfo]
  )

  return {
    tweetList,
    error,
    register,
    handleSubmit,
    isSubmitting,
    handlePostTweet,
    handllePostLike,
    handllePostRetweet
  }
}
