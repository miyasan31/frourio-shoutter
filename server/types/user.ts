import type { Follow, Like, Reply, Retweet, Tweet, User } from '$prisma/client';

export type GetAllUser = (User & {
  _count: {
    followers: number;
    followings: number;
  };
})[];

export type GetUser =
  | (User & {
      _count: {
        followers: number;
        followings: number;
      };
    })
  | null;

export type GetTweetList = User & {
  followers: {
    id: number;
  }[];
  _count: {
    followers: number;
    followings: number;
  };

  tweets: (Tweet & {
    retweets: {
      id: number;
    }[];
    likes: {
      id: number;
    }[];
    _count: {
      replies: number;
      retweets: number;
      likes: number;
    };
  })[];
};

export type GetReplyList = User & {
  followers: {
    id: number;
  }[];
  _count: {
    followers: number;
    followings: number;
  };

  replies: (Reply & {
    tweet?: Tweet;
    user: User & {
      followers: {
        id: number;
      }[];
      _count: {
        followers: number;
        followings: number;
      };
    };
  })[];
};

export type GetLikeList = User & {
  followers: {
    id: number;
  }[];
  _count: {
    followers: number;
    followings: number;
  };

  likes: (Like & {
    tweet: Tweet & {
      retweets: {
        id: number;
      }[];
      likes: {
        id: number;
      }[];
      _count: {
        likes: number;
        retweets: number;
        replies: number;
      };
      user: User & {
        followers: {
          id: number;
        }[];
        _count: {
          followers: number;
          followings: number;
        };
      };
    };
  })[];
};

export type GetRetweetList = User & {
  followers: {
    id: number;
  }[];
  _count: {
    followers: number;
    followings: number;
  };

  retweets: (Retweet & {
    user: User;
    tweet: Tweet & {
      retweets: {
        id: number;
      }[];
      likes: {
        id: number;
      }[];
      _count: {
        likes: number;
        retweets: number;
        replies: number;
      };
      user: User & {
        followers: {
          id: number;
        }[];
        _count: {
          followers: number;
          followings: number;
        };
      };
    };
  })[];
};

export type GetFollowerList = (User & {
  followers: (Follow & {
    following: User;
  })[];
})[];

export type GetFollowingList = (User & {
  followings: (Follow & {
    follower: User;
  })[];
})[];
