export type UserInfo = {
  id: string;
  name: string;
  icon: string;
};

export type RequestUserInfo = {
  sub: string;
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
};

export type AuthHeader = {
  authorization: string;
};

export type User = {
  id: string;
  name: string;
  profile: string;
  createdAt: string;
  tweet?: Tweet[];
  like?: Like[];
  reply?: Reply[];
  retweet?: Retweet[];
  follower?: Follow[];
  following?: Follow[];
};

export type Tweet = {
  id: number;
  userId: string;
  tweet: string;
  createdAt: string;
  user?: User;
  like?: Like[];
  reply?: Reply[];
  retweet?: Retweet[];
};

export type Reply = {
  id: number;
  userId: string;
  tweetId: number;
  reply: string;
  createdAt: string;
  user?: User;
};

export type Like = {
  id: number;
  userId: string;
  tweetId: number;
  createdAt: string;
  user?: User;
  tweet?: Tweet;
};

export type Retweet = {
  id: number;
  userId: string;
  tweetId: number;
  createdAt: string;
  user?: User;
  tweet?: Tweet;
};

export type Follow = {
  id: number;
  userId: string;
  followId: string;
  createdAt: string;
  follower?: User;
  following?: User;
};
