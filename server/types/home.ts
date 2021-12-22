import type { Follow, Reply, Retweet, Tweet, User } from '$prisma/client';

export type GetHome = (Follow & {
  following: User & {
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
    })[];

    replies: (Reply[] & {
      tweet: Tweet;
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
})[];

export type GetMyTweet = (Tweet & {
  retweets: {
    id: number;
  }[];
  likes: {
    id: number;
  }[];
  user: User & {
    followers: {
      id: number;
    }[];
    _count: {
      followers: number;
      followings: number;
    };
  };
  _count: {
    replies: number;
    retweets: number;
    likes: number;
  };
})[];

export type HomeTweetList = (HomeTweet & HomeRetweet & HomeReply)[];

export type HomeTweet = Tweet & {
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

export type HomeRetweet = Retweet & {
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
};

export type HomeReply = Reply & {
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
};
