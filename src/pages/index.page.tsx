import type { NextPage } from 'next'
import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { handleSignout } from '~/hooks/useGetAccessToken'
import { TweetCardList } from '~/components/TweetCardList'
import { TweetForm } from '~/components/TweetForm'

const HomePage: NextPage = () => {
  return (
    <Box w="100%">
      <Button onClick={handleSignout}>サインアウト</Button>

      <TweetForm />
      <TweetCardList />
    </Box>
  )
}

export default HomePage
