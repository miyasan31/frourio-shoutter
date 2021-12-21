import React, { FC, useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { user } from '~/atoms'
import { getToken } from '~/functions'
import { apiClient } from '~/utils'

import { Form } from './Form'

type Props = {
  revalidate?: () => Promise<boolean>
}

export const TweetForm: FC<Props> = (props) => {
  const userInfo = useRecoilValue(user)

  const handlePostTweet = useCallback(
    async (data) => {
      const token = await getToken()
      await apiClient.tweet.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          tweet: data.tweet,
          user: { connect: { id: userInfo.id } }
        }
      })
      props.revalidate ? props.revalidate() : null
    },
    [userInfo]
  )

  return <Form type="tweet" handlePost={handlePostTweet} />
}
