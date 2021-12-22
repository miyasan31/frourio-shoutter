import useAspidaSWR from '@aspida/swr';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { home, user } from '~/atoms';
import { sortTweetList } from '~/functions';
import { useGetAccessToken } from '~/hooks';
import { apiClient } from '~/utils';

export const useGetHomeTweetList = () => {
  const userInfo = useRecoilValue(user);
  const setHomeInfo = useSetRecoilState(home);
  const { token } = useGetAccessToken();

  const { data: homeTweetList, revalidate } = useAspidaSWR(apiClient.home, {
    headers: { authorization: `Bearer ${token}` },
    enabled: !!token && !!userInfo.id,
    refreshInterval: 10000
  });

  if (!homeTweetList) {
    return;
  }

  const allTweetList = sortTweetList(homeTweetList);

  setHomeInfo(allTweetList);

  return {
    revalidate
  };
};
