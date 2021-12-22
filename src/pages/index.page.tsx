import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { TweetCardList } from '~/components/card';
import { TweetForm } from '~/components/form';

const HomePage: NextPage = () => {
  return (
    <Box w="100%">
      <TweetForm />
      <TweetCardList />
    </Box>
  );
};

export default HomePage;
