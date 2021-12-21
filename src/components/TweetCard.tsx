import React, { FC } from 'react'
import Link from 'next/link'
import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import type { User, Tweet } from '$prisma/client'
import { useTweetAction } from '~/hooks/useTweetAction'

type Props = Tweet & {
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

export const TweetCard: FC<Props> = (props) => {
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
      <Box fontSize="1.5rem">ツイート</Box>
      <Box>ツイート内容:{props.tweet}</Box>
      <Box>ツイート時間:{props.createdAt}</Box>

      <Box fontSize="1.5rem">ユーザー情報</Box>
      <Box>ユーザーID:{props.user.id}</Box>
      <Box>ユーザー名:{props.user.name}</Box>
      <Box>フォロー数:{props.user._count.followings}</Box>
      <Box>フォロワー数:{props.user._count.followers}</Box>

      <Box fontSize="1.5rem">カウント情報</Box>
      <Box>リツイート数:{props._count.retweets}</Box>
      <Box>いいね数:{props._count.likes}</Box>
      <Box>リプライ数:{props._count.replies}</Box>

      <Box fontSize="1.5rem">真偽値情報</Box>
      <Box>
        リツイートしたか:{props.retweets.length == 1 ? 'true' : 'false'}
      </Box>

      <Box>いいねしたか:{props.likes.length == 1 ? 'true' : 'false'}</Box>

      <ButtonGroup>
        <Button
          onClick={() => {
            props.user.followers.length == 1
              ? handleDeleteFollow(props.user.followers[0].id)
              : handlePostFollow(props.user.id)
          }}
        >
          {props.user.followers.length == 1 ? 'フォロー中' : 'フォローする'}
        </Button>

        <Link href={`${props.user.id}/tweet/${props.id}`}>
          <a>
            <Button>返信</Button>
          </a>
        </Link>

        <Button
          onClick={() => {
            props.likes.length == 1
              ? handleDeleteLike(props.likes[0].id)
              : handlePostLike(props.id)
          }}
        >
          {props.likes.length == 1 ? 'いいね中' : 'いいねする'}
        </Button>

        <Button
          onClick={() => {
            props.retweets.length == 1
              ? handleDeleteRetweet(props.retweets[0].id)
              : handlePostRetweet(props.id)
          }}
        >
          {props.retweets.length == 1 ? 'リツイート中' : 'リツイートする'}
        </Button>
      </ButtonGroup>
    </Box>
  )
}
