import styled from '@emotion/styled';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IconButton } from '~/components';
import { HomeReply } from '$/types/home';
// import { useTweetAction } from '~/hooks';

const ICON_PHOTO_SIZE = 48;

type Props = {
  data: HomeReply;
  revalidate: () => Promise<boolean>;
};

export const ReplyCard: FC<Props> = (props) => {
  // const { handlePostFollow, handleDeleteFollow } = useTweetAction();

  return (
    <Link href={`${props.data.tweet?.userId}/tweet/${props.data.tweet?.id}`}>
      <a>
        <TweetWrap>
          <IconPhotoWrap>
            <Link href={`/${props.data.user.id}`}>
              <a>
                <UserIcon
                  src={props.data?.user?.icon || '/oden.jpg'}
                  alt="Picture of the author"
                  width={ICON_PHOTO_SIZE}
                  height={ICON_PHOTO_SIZE}
                />
              </a>
            </Link>
          </IconPhotoWrap>

          <TweetInfoWrap>
            <UserInfoWrap>
              <Link href={`/${props.data.user.id}`}>
                <Anker>
                  <UserName>{props.data.user.name}</UserName>
                  <UserId>{`@${props.data.user.id}`}</UserId>
                </Anker>
              </Link>
              <Dot>{'･'}</Dot>
              <CreatedAt>{props.data.createdAt}</CreatedAt>
            </UserInfoWrap>

            <TweetBody>{props.data.reply}</TweetBody>
          </TweetInfoWrap>

          <EditButtonWrap>
            <IconButton icon={<DotsHorizontalIcon />} />
          </EditButtonWrap>
        </TweetWrap>
      </a>
    </Link>
  );
};

const Anker = styled.a`
  display: block;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const TweetWrap = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  width: 100%;
  border-bottom: 1px solid #ccc;
  &:hover: {
    background-color: #ccc;
  }
`;

const UserIcon = styled(Image)`
  border-radius: 9999px;
`;

const IconPhotoWrap = styled.div`
  min-width: fit-content;
`;

const TweetInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.25rem;
  width: 100%;
`;

const UserInfoWrap = styled.div`
  display: flex;
  padding-left: 0.5rem;
  color: #797979;
`;

const UserName = styled.span`
  padding-right: 0.5rem;
  color: #303030;
  font-weight: bold;
  &:hover: {
    text-decoration: underline;
  }
`;

const UserId = styled.span`
  text-decoration: none;
`;

const Dot = styled.span`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`;

const CreatedAt = styled.span`
  &:hover: {
    text-decoration: underline;
  }
`;

const TweetBody = styled.div`
  padding-left: 0.5rem;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const EditButtonWrap = styled.span`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  cursor: pointer;
`;
