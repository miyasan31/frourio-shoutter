import useAspidaSWR from '@aspida/swr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { user } from '~/atoms';
import { Progress } from '~/components';
import { ProfileDetailCard, ReplyCard } from '~/components/card';
import { useGetAccessToken } from '~/hooks';
import { apiClient } from '~/utils';

const ProfileReplyPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const userInfo = useRecoilValue(user);
  const { token } = useGetAccessToken();

  const {
    data: userAndReplyList,
    error,
    revalidate
  } = useAspidaSWR(
    apiClient._userId(String(userId)).reply._requestUserId(userInfo.id),
    {
      headers: { authorization: `Bearer ${token}` },
      enabled: !!token && !!userId
      // refreshInterval: 1000
    }
  );

  if (error) return <div>error</div>;
  if (!userAndReplyList) return <Progress h="100px" />;
  const { replies, ...userProfile } = userAndReplyList;
  return (
    <div>
      <ProfileDetailCard data={userProfile} />

      {replies.map((t, i) => {
        return (
          <ReplyCard
            key={`${t.id}.${i}`}
            data={{ ...t, user: userProfile }}
            revalidate={revalidate}
          />
        );
      })}
    </div>
  );
};

export default ProfileReplyPage;
