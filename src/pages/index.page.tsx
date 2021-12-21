import { Box, Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import React from 'react';

import { TweetCardList } from '~/components/card';
import { TweetForm } from '~/components/form';
import { handleSignout } from '~/functions';

const HomePage: NextPage = () => {
  return (
    <Box w="100%">
      <Button onClick={handleSignout}>サインアウト</Button>

      <TweetForm />
      <TweetCardList />
    </Box>
  );
};

export default HomePage;
