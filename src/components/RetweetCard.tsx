import Link from 'next/link'
import React, { FC } from 'react'
import { Box, ButtonGroup, Button } from '@chakra-ui/react'
import type { Tweet, User, Retweet } from '$prisma/client'
import { useTweetAction } from '~/hooks/useTweetAction'

type Props = Retweet & {
  tweet: Tweet & {
    retweets: {
      id: number
    }[]
    likes: {
      id: number
    }[]
    _count: {
      likes: number
      retweets: number
      replies: number
    }
    user: User & {
      followers: {
        id: number
      }[]
      _count: {
        followers: number
        followings: number
      }
    }
  }
}

export const RetweetCard: FC<Props> = (props) => {
  const {
    handlePostLike,
    handleDeleteLike,
    handlePostRetweet,
    handleDeleteRetweet,
    handlePostFollow,
    handleDeleteFollow
  } = useTweetAction()

  return (
    <Box spacing="1rem" mt="1rem" p="1rem" border="1px">
      <Box fontSize="1.5rem">リツイート</Box>
      <Box>リツイート内容:{props.tweet.tweet}</Box>
      <Box>リツイート時間:{props.createdAt}</Box>

      <Box fontSize="1.5rem">ユーザー情報</Box>
      <Box>ユーザーID:{props.tweet.user.id}</Box>
      <Box>ユーザー名:{props.tweet.user.name}</Box>
      <Box>フォロー数:{props.tweet.user._count.followings}</Box>
      <Box>フォロワー数:{props.tweet.user._count.followers}</Box>

      <Box fontSize="1.5rem">カウント情報</Box>
      <Box>リツイート数:{props.tweet._count.retweets}</Box>
      <Box>いいね数:{props.tweet._count.likes}</Box>
      <Box>リプライ数:{props.tweet._count.replies}</Box>

      <Box fontSize="1.5rem">真偽値情報</Box>
      <Box>
        フォローしているか:
        {props.tweet.user.followers.length == 1 ? 'true' : 'false'}
      </Box>
      <Box>
        リツイートしたか:{props.tweet.retweets.length == 1 ? 'true' : 'false'}
      </Box>
      <Box>いいねしたか:{props.tweet.likes.length == 1 ? 'true' : 'false'}</Box>

      <ButtonGroup>
        <Button
          onClick={() => {
            props.tweet.user.followers.length == 1
              ? handleDeleteFollow(props.tweet.user.followers[0].id)
              : handlePostFollow(props.tweet.user.id)
          }}
        >
          {props.tweet.user.followers.length == 1
            ? 'フォロー中'
            : 'フォローする'}
        </Button>

        <Link href={`${props.tweet.user.id}/tweet/${props.tweet.id}`}>
          <a>
            <Button>返信</Button>
          </a>
        </Link>

        <Button
          onClick={() => {
            props.tweet.likes.length == 1
              ? handleDeleteLike(props.tweet.likes[0].id)
              : handlePostLike(props.tweetId)
          }}
        >
          {props.tweet.likes.length == 1 ? 'いいね中' : 'いいねする'}
        </Button>

        <Button
          onClick={() => {
            props.tweet.retweets.length == 1
              ? handleDeleteRetweet(props.tweet.retweets[0].id)
              : handlePostRetweet(props.tweetId)
          }}
        >
          {props.tweet.retweets.length == 1 ? 'リツイート中' : 'リツイートする'}
        </Button>
      </ButtonGroup>
    </Box>
  )
}
