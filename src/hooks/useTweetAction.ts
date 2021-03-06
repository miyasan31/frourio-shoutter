import { MouseEvent, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { user } from '~/atoms';
import { getToken } from '~/functions';
import { apiClient } from '~/utils';

type TweetEvent = MouseEvent<HTMLButtonElement>;

type UseTweetAction = (revalidate: () => Promise<boolean>) => {
  handlePostLike: (e: TweetEvent, id: number) => Promise<void>;
  handleDeleteLike: (e: TweetEvent, id: number) => Promise<void>;
  handlePostRetweet: (e: TweetEvent, id: number) => Promise<void>;
  handleDeleteRetweet: (e: TweetEvent, id: number) => Promise<void>;
  handlePostFollow: (e: TweetEvent, id: string) => Promise<void>;
  handleDeleteFollow: (e: TweetEvent, id: number) => Promise<void>;
};

export const useTweetAction: UseTweetAction = (revalidate) => {
  const userInfo = useRecoilValue(user);

  const handlePostLike = useCallback(
    async (e, id) => {
      e.preventDefault();
      const token = await getToken();
      apiClient.like.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          tweet: { connect: { id: id } },
          user: { connect: { id: userInfo.id } }
        }
      });
      revalidate();
    },
    [userInfo, revalidate]
  );

  const handleDeleteLike = useCallback(
    async (e, id) => {
      e.preventDefault();
      const token = await getToken();
      apiClient.like._likeId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      });
      revalidate();
    },
    [userInfo, revalidate]
  );

  const handlePostRetweet = useCallback(
    async (e, id) => {
      e.preventDefault();
      const token = await getToken();
      apiClient.retweet.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          tweet: { connect: { id: id } },
          user: { connect: { id: userInfo.id } }
        }
      });
      revalidate();
    },
    [userInfo, revalidate]
  );

  const handleDeleteRetweet = useCallback(
    async (e, id) => {
      e.preventDefault();
      const token = await getToken();
      apiClient.retweet._retweetId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      });
      revalidate();
    },
    [userInfo, revalidate]
  );

  const handlePostFollow = useCallback(
    async (e, id) => {
      e.preventDefault();
      const token = await getToken();
      apiClient.follow.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          follower: { connect: { id: userInfo.id } },
          following: { connect: { id: id } }
        }
      });
      revalidate();
    },
    [userInfo, revalidate]
  );

  const handleDeleteFollow = useCallback(
    async (e, id) => {
      e.preventDefault();
      const token = await getToken();
      apiClient.follow._followId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      });
      revalidate();
    },
    [userInfo, revalidate]
  );

  return {
    handlePostLike,
    handleDeleteLike,
    handlePostRetweet,
    handleDeleteRetweet,
    handlePostFollow,
    handleDeleteFollow
  };
};
