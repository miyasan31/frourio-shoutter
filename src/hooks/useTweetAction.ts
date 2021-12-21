import { useCallback } from 'react'
import { apiClient } from '~/utils/apiClient'
import { user } from '~/atoms'
import { useRecoilValue } from 'recoil'
import { useGetAccessToken } from '~/hooks/useGetAccessToken'

export const useTweetAction = () => {
  const userInfo = useRecoilValue(user)

  const { token } = useGetAccessToken()

  const handlePostLike = useCallback(
    (e, id) => {
      e.preventDefault()
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

  const handleDeleteLike = useCallback(
    (e, id) => {
      e.preventDefault()
      apiClient.like._likeId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      })
    },
    [userInfo, token]
  )

  const handlePostRetweet = useCallback(
    (e, id) => {
      e.preventDefault()
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

  const handleDeleteRetweet = useCallback(
    (e, id) => {
      e.preventDefault()
      apiClient.retweet._retweetId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      })
    },
    [userInfo, token]
  )

  const handlePostFollow = useCallback(
    (e, id) => {
      e.preventDefault()
      apiClient.follow.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          follower: { connect: { id: userInfo.id } },
          following: { connect: { id: id } }
        }
      })
    },
    [userInfo, token]
  )

  const handleDeleteFollow = useCallback(
    (e, id) => {
      e.preventDefault()
      apiClient.follow._followId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      })
    },
    [userInfo, token]
  )

  return {
    handlePostLike,
    handleDeleteLike,
    handlePostRetweet,
    handleDeleteRetweet,
    handlePostFollow,
    handleDeleteFollow
  }
}
