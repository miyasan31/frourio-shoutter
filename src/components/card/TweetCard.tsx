import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import type { User, Tweet } from '$prisma/client'
import { useTweetAction } from '~/hooks'
import { TweetActionGroup } from './TweetActionGroup'
import styled from '@emotion/styled'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { IconButton } from '~/components'

const ICON_PHOTO_SIZE = 48

type Props = Tweet & {
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

export const TweetCard: FC<Props> = (props) => {
  const {
    handlePostLike,
    handleDeleteLike,
    handlePostRetweet,
    handleDeleteRetweet,
    handlePostFollow,
    handleDeleteFollow
  } = useTweetAction()

  console.info(props)

  return (
    <Link href={`${props.userId}/tweet/${props.id}`}>
      <a>
        <TweetWrap>
          <IconPhotoWrap>
            <Link href={`/${props.userId}`}>
              <a>
                <UserIcon
                  src={props.user.icon}
                  alt="Picture of the author"
                  width={ICON_PHOTO_SIZE}
                  height={ICON_PHOTO_SIZE}
                />
              </a>
            </Link>
          </IconPhotoWrap>

          <TweetInfoWrap>
            <UserInfoWrap>
              <Link href={`/${props.userId}`}>
                <Anker>
                  <UserName>{props.user.name}</UserName>
                  <UserId>{`@${props.user.id}`}</UserId>
                </Anker>
              </Link>
              <Dot>{'･'}</Dot>
              <CreatedAt>{props.createdAt}</CreatedAt>
            </UserInfoWrap>

            <TweetBody>{props.tweet}</TweetBody>

            <TweetActionGroup
              isRetweet={props.retweets.length == 1}
              isLike={props.likes.length == 1}
              retweetCount={props._count.retweets}
              likeCount={props._count.likes}
              commentCount={props._count.replies}
              handleToggleRetweet={(e) => {
                props.retweets.length == 0
                  ? handlePostRetweet(e, props.id)
                  : handleDeleteRetweet(e, props.retweets[0].id)
              }}
              handleToggleLike={(e) => {
                props.likes.length == 0
                  ? handlePostLike(e, props.id)
                  : handleDeleteLike(e, props.likes[0].id)
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
  padding-top: 0.75rem;
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
