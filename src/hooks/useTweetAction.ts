import { useCallback } from 'react'
import { apiClient } from '~/utils/apiClient'
import { user } from '~/atoms'
import { useRecoilValue } from 'recoil'
import { useGetAccessToken } from '~/hooks/useGetAccessToken'

export const useTweetAction = () => {
  const userInfo = useRecoilValue(user)

  const { token } = useGetAccessToken()

  const handllePostLike = useCallback(
    (id) => {
      apiClient.like.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          tweet: { connect: { id: id } },
          user: { connect: { id: userInfo.id } }
        }
      })
    },
    [userInfo, token]
  )

  const handlleDeleteLike = useCallback(
    (id) => {
      apiClient.like._likeId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      })
    },
    [userInfo, token]
  )

  const handllePostRetweet = useCallback(
    (id) => {
      apiClient.retweet.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          tweet: { connect: { id: id } },
          user: { connect: { id: userInfo.id } }
        }
      })
    },
    [userInfo, token]
  )

  const handlleDeleteRetweet = useCallback(
    (id) => {
      apiClient.retweet._retweetId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      })
    },
    [userInfo, token]
  )

  const handllePostFollow = useCallback(
    (id) => {
      apiClient.follow.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          follower: { connect: { id: id } },
          following: { connect: { id: userInfo.id } }
        }
      })
    },
    [userInfo, token]
  )

  const handkeDeleteFollow = useCallback(
    (id) => {
      apiClient.follow._followId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      })
    },
    [userInfo, token]
  )

  return {
    handllePostLike,
    handlleDeleteLike,
    handllePostRetweet,
    handlleDeleteRetweet,
    handllePostFollow,
    handkeDeleteFollow
  }
}
