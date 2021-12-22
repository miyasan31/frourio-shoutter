import produce from 'immer';

import { HomeTweetList } from '$/types/home';

export const sortTweetList = (homeTweetList: any): HomeTweetList => {
  const followingUser = homeTweetList.followingUser.reduce(
    (prevList: any, currentList: any) => {
      const { tweets, retweets, replies } = currentList.following;
      const allTweetList = produce(
        [...tweets, ...retweets, ...replies],
        (draftState) => {
          draftState.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return 1;
            } else {
              return -1;
            }
          });
        }
      );
      return [...prevList, ...allTweetList];
    },
    []
  );

  const currentUser = homeTweetList.currentUser;

  const allTweetList = produce(
    [...followingUser, ...currentUser],
    (draftState) => {
      draftState.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return 1;
        } else {
          return -1;
        }
      });
    }
  );
  return allTweetList;
};
