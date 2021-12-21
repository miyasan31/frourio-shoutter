import styled from '@emotion/styled'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { IconButton } from '~/components'
import { useTweetAction } from '~/hooks'
import type { Retweet, Tweet, User } from '$prisma/client'

import { TweetActionGroup } from './TweetActionGroup'

const ICON_PHOTO_SIZE = 48

type Props = Retweet & {
  user: User
  tweet: Tweet & {
    retweets: {
      id: number
    }[]
    likes: {
      id: number
    }[]
    _count: {
      likes: number
      retweets: number
      replies: number
    }
    user: User & {
      followers: {
        id: number
      }[]
      _count: {
        followers: number
        followings: number
      }
    }
  }
}

export const RetweetCard: FC<Props> = (props) => {
  const {
    handlePostLike,
    handleDeleteLike,
    handlePostRetweet,
    handleDeleteRetweet,
    handlePostFollow,
    handleDeleteFollow
  } = useTweetAction()

  return (
    <Link href={`${props.tweet.userId}/tweet/${props.tweet.id}`}>
      <a>
        <RetweetLabel>{props.user.name}さんがリツイートしました</RetweetLabel>
        <TweetWrap>
          <IconPhotoWrap>
            <Link href={`/${props.tweet.user.id}`}>
              <a>
                <UserIcon
                  src={props.tweet.user.icon}
                  alt="Picture of the author"
                  width={ICON_PHOTO_SIZE}
                  height={ICON_PHOTO_SIZE}
                />
              </a>
            </Link>
          </IconPhotoWrap>

          <TweetInfoWrap>
            <UserInfoWrap>
              <Link href={`/${props.tweet.user.id}`}>
                <Anker>
                  <UserName>{props.tweet.user.name}</UserName>
                  <UserId>{`@${props.tweet.user.id}`}</UserId>
                </Anker>
              </Link>
              <Dot>{'･'}</Dot>
              <CreatedAt>{props.tweet.createdAt}</CreatedAt>
            </UserInfoWrap>

            <TweetBody>{props.tweet.tweet}</TweetBody>

            <TweetActionGroup
              isRetweet={props.tweet.retweets.length == 1}
              isLike={props.tweet.likes.length == 1}
              retweetCount={props.tweet._count.retweets}
              likeCount={props.tweet._count.likes}
              commentCount={props.tweet._count.replies}
              handleToggleRetweet={(e) => {
                props.tweet.retweets.length == 0
                  ? handlePostRetweet(e, props.tweet.id)
                  : handleDeleteRetweet(e, props.tweet.retweets[0].id)
              }}
              handleToggleLike={(e) => {
                props.tweet.likes.length == 0
                  ? handlePostLike(e, props.tweet.id)
                  : handleDeleteLike(e, props.tweet.likes[0].id)
              }}
            />
          </TweetInfoWrap>

          <EditButtonWrap>
            <IconButton icon={<DotsHorizontalIcon />} />
          </EditButtonWrap>
        </TweetWrap>
      </a>
    </Link>
  )
}

const RetweetLabel = styled.div`
  padding-top: 0.75rem;
  margin-left: 5rem;
  font-size: 0.75rem;
`

const Anker = styled.a`
  display: block;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const TweetWrap = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  border-bottom: 1px solid #ccc;
  &:hover: {
    background-color: #ccc;
  }
`

const UserIcon = styled(Image)`
  border-radius: 9999px;
`

const IconPhotoWrap = styled.div`
  min-width: fit-content;
`

const TweetInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.25rem;
  width: 100%;
`

const UserInfoWrap = styled.div`
  display: flex;
  padding-left: 0.5rem;
  color: #797979;
`

const UserName = styled.span`
  padding-right: 0.5rem;
  color: #303030;
  font-weight: bold;
  &:hover: {
    text-decoration: underline;
  }
`

const UserId = styled.span`
  text-decoration: none;
`

const Dot = styled.span`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`

const CreatedAt = styled.span`
  &:hover: {
    text-decoration: underline;
  }
`

const TweetBody = styled.div`
  padding-left: 0.5rem;
  white-space: pre-wrap;
  word-wrap: break-word;
`

const EditButtonWrap = styled.span`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  cursor: pointer;
`
