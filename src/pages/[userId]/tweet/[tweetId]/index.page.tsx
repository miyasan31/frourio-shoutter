import useAspidaSWR from '@aspida/swr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { user } from '~/atoms';
import { Progress } from '~/components';
import { ReplyCard, TweetCard } from '~/components/card';
import { ReplyForm } from '~/components/form';
import { useGetAccessToken } from '~/hooks';
import { apiClient } from '~/utils';

const TweetPage: NextPage = () => {
  const router = useRouter();
  const { tweetId } = router.query;
  const userInfo = useRecoilValue(user);
  const { token } = useGetAccessToken();

  const {
    data: tweetAndReplies,
    error,
    revalidate
  } = useAspidaSWR(
    apiClient.tweet._tweetId(Number(tweetId))._requestUserId(userInfo.id),
    {
      headers: { authorization: `Bearer ${token}` },
      enabled: !!token && !!tweetId,
      refreshInterval: 1000
    }
  );

  if (error) return <div>error</div>;
  if (!tweetAndReplies) return <Progress h="100px" />;
  const { replies: replyList, ...tweet } = tweetAndReplies;

  return (
    <>
      <TweetCard data={tweet} revalidate={revalidate} />
      <ReplyForm userId={tweet.userId} revalidate={revalidate} />
      {replyList.map((reply) => {
        return (
          <ReplyCard key={reply.id} data={reply} revalidate={revalidate} />
        );
      })}
    </>
  );
};

export default TweetPage;
