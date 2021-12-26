import useAspidaSWR from '@aspida/swr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { user } from '~/atoms';
import { Progress } from '~/components';
import { ProfileDetailCard, TweetCard } from '~/components/card';
import { useGetAccessToken } from '~/hooks';
import { apiClient } from '~/utils';

const ProfileLikePage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const userInfo = useRecoilValue(user);
  const { token } = useGetAccessToken();

  const {
    data: userAndLikeList,
    error,
    revalidate
  } = useAspidaSWR(
    apiClient._userId(String(userId)).like._requestUserId(userInfo.id),
    {
      headers: { authorization: `Bearer ${token}` },
      enabled: !!token && !!userId
      // refreshInterval: 1000
    }
  );

  if (error) return <div>error</div>;
  if (!userAndLikeList) return <Progress h="100px" />;
  const { likes, ...userProfile } = userAndLikeList;

  return (
    <div>
      <ProfileDetailCard data={userProfile} />

      {likes?.map((t, i) => {
        return (
          <TweetCard
            key={`${t.id}.${i}`}
            data={t.tweet}
            revalidate={revalidate}
          />
        );
      })}
    </div>
  );
};

export default ProfileLikePage;
