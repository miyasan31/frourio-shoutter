import useAspidaSWR from '@aspida/swr';
import { Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { user } from '~/atoms';
import { Progress } from '~/components';
import { ProfileDetailCard, TweetCard } from '~/components/card';
import { handleSignout } from '~/functions';
import { useGetAccessToken } from '~/hooks';
import { apiClient } from '~/utils';

const ProfileTweetPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const userInfo = useRecoilValue(user);
  const { token } = useGetAccessToken();

  const {
    data: userAndTweetList,
    error,
    revalidate
  } = useAspidaSWR(
    apiClient._userId(String(userId)).tweet._requestUserId(userInfo.id),
    {
      headers: { authorization: `Bearer ${token}` },
      enabled: !!token && !!userId
      // refreshInterval: 1000
    }
  );

  if (error) return <div>error</div>;
  if (!userAndTweetList) return <Progress h="100px" />;
  const { tweets, ...userProfile } = userAndTweetList;

  return (
    <div>
      <ProfileDetailCard data={userProfile} />

      {tweets.map((t, i) => {
        return (
          <TweetCard
            key={`${t.id}.${i}`}
            data={{ ...t, user: userProfile }}
            revalidate={revalidate}
          />
        );
      })}
      <Button onClick={handleSignout}>サインアウト</Button>
    </div>
  );
};

export default ProfileTweetPage;
