import produce from 'immer';

export const sortTweetList = (homeTweetList: any) => {
  const result = homeTweetList.reduce((prevList: any, currentList: any) => {
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
  }, []);

  const allTweetList = produce([...result], (draftState) => {
    draftState.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return -1;
      }
    });
  });
  return allTweetList;
};
