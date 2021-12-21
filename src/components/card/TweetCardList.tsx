import useAspidaSWR from '@aspida/swr';
import Link from 'next/link';
import React, { VFC } from 'react';
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

  const { data: homeTweetList, error } = useAspidaSWR(
    apiClient.home._userId(userInfo.id),
    {
      headers: { authorization: `Bearer ${token}` },
      enabled: !!token && !!userInfo.id,
      refreshInterval: 1000
    }
  );

  if (error) {
    return (
      <Link href="/signup/follow">
        <a>フォローするユーザーを見つける</a>
      </Link>
    );
  }

  if (!homeTweetList) return <Progress h="100px" />;

  const allTweetList = sortTweetList(homeTweetList);

  return (
    <>
      {allTweetList.map((t, i) => {
        return (
          <div key={`${t.userId}.${i}`}>
            {Object.keys(t).includes('reply') ? (
              <ReplyCard {...t} />
            ) : Object.keys(t).includes('_count') ? (
              <TweetCard {...t} />
            ) : (
              <RetweetCard {...t} />
            )}
          </div>
        );
      })}
    </>
  );
};
