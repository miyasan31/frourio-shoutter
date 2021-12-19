import React, { useCallback } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import { user } from '~/atoms'
import { useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'
import { Box, Button, ListItem, List, Textarea } from '@chakra-ui/react'
import { useGetAccessToken } from '~/hooks/useGetAccessToken'

const TweetPage: NextPage = () => {
  const userInfo = useRecoilValue(user)
  const router = useRouter()
  const { tweetId } = router.query
  const { token } = useGetAccessToken()

  const {
    data: tweetAndReplies,
    error,
    revalidate
  } = useAspidaSWR(apiClient.tweet._tweetId(Number(tweetId)), {
    headers: { authorization: `Bearer ${token}` },
    enabled: !!token && !!tweetId
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  const handlePostTweet = useCallback(
    async (data) => {
      await apiClient.reply.post({
        headers: { authorization: `Bearer ${token}` },
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

  if (error) return <div>error</div>
  if (!tweetAndReplies) return <div>loading</div>
  const { replies: replyList, ...tweet } = tweetAndReplies

  return (
    <Box w="100%" p="1rem">
      <Box border="1px" borderColor="gray.200" p="1rem">
        <Box>{tweet.tweet}</Box>
        <Box>{tweet.userId}</Box>
        <Box>{tweet.createdAt}</Box>
        <Box>reply:{tweet._count.replies}</Box>
        <Box>retweet:{tweet._count.retweets}</Box>
        <Box>like:{tweet._count.likes}</Box>
      </Box>

      <Box bg="blue.100" p="1rem" mt="1rem">
        <form onSubmit={handleSubmit(handlePostTweet)}>
          <Textarea
            {...register('reply')}
            placeholder="返信する"
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
            返信
          </Button>
        </form>
      </Box>

      <List spacing="1rem" mt="1rem">
        {replyList.map((r) => (
          <ListItem key={r.id} border="1px" borderColor="gray.200" p="1rem">
            <Box>{r.reply}</Box>
            <Box>{r.userId}</Box>
            <Box>{r.createdAt}</Box>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default TweetPage
