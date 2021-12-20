import type { NextPage } from 'next'
import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { handleSignout } from '~/hooks/useGetAccessToken'
import { TweetCardList } from '~/components/TweetCardList'
import { TweetForm } from '~/components/TweetForm'

const HomePage: NextPage = () => {
  return (
    <Box w="100%" p="1rem">
      <Box w="100%" py="1rem">
        <Button onClick={handleSignout}>サインアウト</Button>
      </Box>

      <TweetForm />
      <TweetCardList />
    </Box>
  )
}

export default HomePage
