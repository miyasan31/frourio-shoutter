import React, { VFC } from 'react'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import { user } from '~/atoms'
import { useRecoilValue } from 'recoil'
import { useGetAccessToken } from '~/hooks/useGetAccessToken'
import { TweetCard } from './TweetCard'
import { RetweetCard } from './RetweetCard'
import { ReplyCard } from './ReplyCard'
import { sortTweetList } from '~/functions/sortTweetList'
import { Progress } from './Progress'
import Link from 'next/link'

export const TweetCardList: VFC = () => {
  const userInfo = useRecoilValue(user)
  const { token } = useGetAccessToken()

  const { data: homeTweetList, error } = useAspidaSWR(
    apiClient.home._userId(userInfo.id),
    {
      headers: { authorization: `Bearer ${token}` },
      enabled: !!token && !!userInfo.id,
      refreshInterval: 1000
    }
  )

  if (error) {
    return (
      <Link href="/signup/follow">
        <a>フォローするユーザーを見つける</a>
      </Link>
    )
  }

  if (!homeTweetList) return <Progress h="100px" />

  const allTweetList = sortTweetList(homeTweetList)

  return (
    <div>
      {allTweetList.map((t, i) => {
        return (
          <div key={`${t.userId}.${i}`}>
            {Object.keys(t).includes('reply') ? (
              <ReplyCard {...t} />
            ) : Object.keys(t).includes('_count') ? (
              <TweetCard {...t} />
            ) : (
              <RetweetCard {...t} />
            )}
          </div>
        )
      })}
    </div>
  )
}
