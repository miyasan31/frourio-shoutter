import type { NextPage } from 'next'
import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { handleSignout } from '~/functions'
import { TweetCardList } from '~/components/card'
import { TweetForm } from '~/components/form'

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
