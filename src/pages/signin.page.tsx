import { Box, Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';

import { handleSignin } from '~/functions';

const SigninPage: NextPage = () => {
  return (
    <Box w="100%" py="1rem">
      <Button onClick={handleSignin}>サインインする</Button>
    </Box>
  );
};

export default SigninPage;
