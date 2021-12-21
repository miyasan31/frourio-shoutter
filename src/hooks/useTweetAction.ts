import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { user } from '~/atoms';
import { getToken } from '~/functions';
import { apiClient } from '~/utils';

export const useTweetAction = () => {
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
    },
    [userInfo]
  );

  const handleDeleteLike = useCallback(
    async (e, id) => {
      e.preventDefault();
      const token = await getToken();
      apiClient.like._likeId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      });
    },
    [userInfo]
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
    },
    [userInfo]
  );

  const handleDeleteRetweet = useCallback(
    async (e, id) => {
      e.preventDefault();
      const token = await getToken();
      apiClient.retweet._retweetId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      });
    },
    [userInfo]
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
    },
    [userInfo]
  );

  const handleDeleteFollow = useCallback(
    async (e, id) => {
      e.preventDefault();
      const token = await getToken();
      apiClient.follow._followId(id).delete({
        headers: { authorization: `Bearer ${token}` }
      });
    },
    [userInfo]
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
