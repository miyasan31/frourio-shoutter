import React, { FC } from 'react'
import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import type { Reply, User } from '$prisma/client'
import { useTweetAction } from '~/hooks/useTweetAction'

type Props = Reply & {
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

export const ReplyCard: FC<Props> = (props) => {
  const { handlePostFollow, handleDeleteFollow } = useTweetAction()

  return (
    <Box spacing="1rem" mt="1rem" p="1rem" border="1px">
      <Box fontSize="1.5rem">リプライ</Box>
      <Box>リプライ内容:{props.reply}</Box>
      <Box>リプライ時間:{props.createdAt}</Box>

      <Box fontSize="1.5rem">ユーザー情報</Box>
      <Box>ユーザーID:{props.user.id}</Box>
      <Box>ユーザー名:{props.user.name}</Box>
      <Box>フォロー数:{props.user._count.followings}</Box>
      <Box>フォロワー数:{props.user._count.followers}</Box>

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
      </ButtonGroup>
    </Box>
  )
}
