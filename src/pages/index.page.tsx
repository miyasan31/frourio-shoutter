import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useCallback } from 'react'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import {
  Box,
  Button,
  ListItem,
  List,
  Textarea,
  ButtonGroup
} from '@chakra-ui/react'
import { user } from '~/atoms'
import { useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'

const HomePage: NextPage = () => {
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

  if (error) return <div>failed to load</div>
  if (!tweetList) return <div>no data</div>
  return (
    <Box w="100%" p="1rem">
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

      <List spacing="1rem" mt="1rem">
        {tweetList.map((t) => (
          <ListItem key={t.id} border="1px" borderColor="gray.200" p="1rem">
            <Box>{t.tweet}</Box>
            <Box>{t.userId}</Box>
            <Box>{t.createdAt}</Box>
            <Box>reply:{t._count.replies}</Box>
            <Box>retweet:{t._count.retweets}</Box>
            <Box>like:{t._count.likes}</Box>

            <ButtonGroup>
              <Link href={`/${t.userId}/tweet/${t.id}`}>
                <a>
                  <Button bg="blue.300" color="white">
                    返信する
                  </Button>
                </a>
              </Link>
              <Button
                bg="pink.300"
                color="white"
                onClick={() => handllePostLike(t.id)}
              >
                ライクする
              </Button>
              <Button
                bg="green.300"
                color="white"
                onClick={() => handllePostRetweet(t.id)}
              >
                リツイートする
              </Button>
            </ButtonGroup>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default HomePage
