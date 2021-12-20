import React, { FC } from 'react'
import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import type { Reply, User } from '$prisma/client'

type Props = Reply & {
  user: User & {
    _count: {
      followers: number
      followings: number
    }
  }
}

export const ReplyCard: FC<Props> = (props) => {
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
        <Button>フォロー</Button>
      </ButtonGroup>
    </Box>
  )
}
