import useAspidaSWR from '@aspida/swr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { user } from '~/atoms';
import { Progress } from '~/components';
import { ProfileDetailCard, RetweetCard } from '~/components/card';
import { useGetAccessToken } from '~/hooks';
import { apiClient } from '~/utils';

const ProfileRetweetPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const userInfo = useRecoilValue(user);
  const { token } = useGetAccessToken();

  const {
    data: userAndRetweetList,
    error,
    revalidate
  } = useAspidaSWR(
    apiClient._userId(String(userId)).retweet._requestUserId(userInfo.id),
    {
      headers: { authorization: `Bearer ${token}` },
      enabled: !!token && !!userId
      // refreshInterval: 1000
    }
  );

  if (error) return <div>error</div>;
  if (!userAndRetweetList) return <Progress h="100px" />;
  const { retweets, _count, followers, ...userProfile } = userAndRetweetList;

  return (
    <div>
      <ProfileDetailCard data={{ ...userProfile, _count, followers }} />

      {retweets.map((t, i) => {
        return (
          <RetweetCard
            key={`${t.id}.${i}`}
            data={{ ...t, user: userProfile }}
            revalidate={revalidate}
          />
        );
      })}
    </div>
  );
};

export default ProfileRetweetPage;
