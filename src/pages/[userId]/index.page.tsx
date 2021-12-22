import { Button } from '@chakra-ui/react';
import { NextPage } from 'next';

import { handleSignout } from '~/functions';

const ProfileTweetPage: NextPage = () => {
  return (
    <div>
      <Button onClick={handleSignout}>サインアウト</Button>
      <div>ProfileTweetPage</div>
    </div>
  );
};

export default ProfileTweetPage;
