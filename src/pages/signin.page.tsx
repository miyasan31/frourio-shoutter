import { Box, Button } from '@chakra-ui/react';
import { NextPage } from 'next';

import { handleSignin, handleSignout } from '~/functions';

const SigninPage: NextPage = () => {
  return (
    <Box w="100%" py="1rem">
      <Button onClick={handleSignin}>サインインする</Button>
      <Button onClick={handleSignout}>サインアウトする</Button>
    </Box>
  );
};

export default SigninPage;
