import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils'
import { useGetAccessToken } from '~/hooks'
import { Progress } from '~/components'
import { TweetCard, ReplyCard } from '~/components/card'
import { ReplyForm } from '~/components/form'

const TweetPage: NextPage = () => {
  const router = useRouter()
  const { tweetId } = router.query
  const { token } = useGetAccessToken()

  const {
    data: tweetAndReplies,
    error,
    revalidate
  } = useAspidaSWR(apiClient.tweet._tweetId(Number(tweetId)), {
    headers: { authorization: `Bearer ${token}` },
    enabled: !!token && !!tweetId,
    refreshInterval: 1000
  })

  if (error) return <div>error</div>
  if (!tweetAndReplies) return <Progress h="100px" />
  const { replies: replyList, ...tweet } = tweetAndReplies

  return (
    <>
      <TweetCard {...tweet} />
      <ReplyForm userId={tweet.userId} revalidate={revalidate} />
      {replyList.map((reply) => {
        return <ReplyCard key={reply.id} {...reply} />
      })}
    </>
  )
}

export default TweetPage
