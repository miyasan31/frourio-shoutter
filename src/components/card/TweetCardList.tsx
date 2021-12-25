import useAspidaSWR from '@aspida/swr';
import { VFC } from 'react';
import { useRecoilValue } from 'recoil';

import { user } from '~/atoms';
import { Progress } from '~/components';
import { sortTweetList } from '~/functions';
import { useGetAccessToken } from '~/hooks';
import { apiClient } from '~/utils';

import { ReplyCard } from './ReplyCard';
import { RetweetCard } from './RetweetCard';
import { TweetCard } from './TweetCard';

export const TweetCardList: VFC = () => {
  const userInfo = useRecoilValue(user);
  const { token } = useGetAccessToken();

  const { data: homeTweetList, revalidate } = useAspidaSWR(
    apiClient.home._requestUserId(userInfo.id),
    {
      headers: { authorization: `Bearer ${token}` },
      enabled: !!token && !!userInfo.id
      // refreshInterval: 1000
    }
  );

  if (!homeTweetList) return <Progress h="100px" />;

  const allTweetList = sortTweetList(homeTweetList);

  return (
    <>
      {allTweetList.map((t, i) => {
        return (
          <div key={`${t.userId}.${i}`}>
            {Object.keys(t).includes('reply') ? (
              <ReplyCard data={t} revalidate={revalidate} />
            ) : Object.keys(t).includes('_count') ? (
              <TweetCard data={t} revalidate={revalidate} />
            ) : (
              <RetweetCard data={t} revalidate={revalidate} />
            )}
          </div>
        );
      })}
    </>
  );
};
