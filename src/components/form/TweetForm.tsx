import useAspidaSWR from '@aspida/swr';
import { FC, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { user } from '~/atoms';
import { getToken } from '~/functions';
import { useGetAccessToken } from '~/hooks';
import { apiClient } from '~/utils';

import { Form } from './Form';

export const TweetForm: FC = () => {
  const userInfo = useRecoilValue(user);
  const { token } = useGetAccessToken();

  const { revalidate } = useAspidaSWR(
    apiClient.home._requestUserId(userInfo.id),
    {
      headers: { authorization: `Bearer ${token}` },
      enabled: !!token && !!userInfo.id
      // refreshInterval: 1000
    }
  );

  const handlePostTweet = useCallback(
    async (data) => {
      const token = await getToken();
      await apiClient.tweet.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          tweet: data.tweet,
          user: { connect: { id: userInfo.id } }
        }
      });
      revalidate();
    },
    [userInfo, revalidate]
  );

  return <Form type="tweet" onPost={handlePostTweet} />;
};
