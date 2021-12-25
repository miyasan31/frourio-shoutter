import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

type Props = {
  data: {
    id: string;
    name: string;
    profile: string;
    icon: string;
    email: string;
    createdAt: Date;
    followers: {
      id: number;
    }[];
    _count: {
      followers: number;
      followings: number;
    };
  };
};
export const ProfileDetailCard: FC<Props> = (props) => {
  return (
    <ProfileWrap>
      <Image
        src="/1500x500.jpeg"
        alt="Picture of the author"
        layout="responsive"
        width={1500}
        height={500}
      />

      <ProfileBodyWrap>
        <IconWrap>
          <NextImage
            src={props.data.icon || '/oden.jpg'}
            alt="Picture of the author"
            layout="fill"
          />
        </IconWrap>

        <EditButtonWrap>
          <Button type="submit" color="white" bgColor="blue.300" rounded="full">
            プロフィールを編集
          </Button>
        </EditButtonWrap>

        <UserName>{props.data.name}</UserName>
        <UserId>
          {'@'}
          {props.data.id}
        </UserId>

        <ProfileBody>{props.data.profile}</ProfileBody>

        <Flex>
          <TextWrap>
            <Link href={`/${props.data.id}/following`}>
              <FollowCount>
                <CountText>{props.data._count?.followers}</CountText>
                &nbsp;フォロー中
              </FollowCount>
            </Link>
          </TextWrap>

          <TextWrap>
            <Link href={`/${props.data.id}/follower`}>
              <FollowCount>
                <CountText>{props.data._count?.followings}</CountText>
                &nbsp;フォロワー
              </FollowCount>
            </Link>
          </TextWrap>
        </Flex>
      </ProfileBodyWrap>

      {/* <ProfileTab userId={props.id} /> */}
    </ProfileWrap>
  );
};

const Flex = styled.div`
  display: flex;
  gap: 1rem;
`;

const NextImage = styled(Image)`
  object-fit: cover;
`;

const IconWrap = styled.div`
  position: absolute;
  top: -2.5rem;
  left: 1rem;
  z-index: 5;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 9999px;
  border: 3px solid #ffffff;
`;

const ProfileWrap = styled.div`
  border-bottom: 1px solid #ccc;
`;

const ProfileBodyWrap = styled.div`
  position: relative;
  padding: 1rem;
`;

const EditButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  padding-bottom: 0.75rem;
`;

const UserName = styled.div`
  color: #303030;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1rem;
`;

const UserId = styled.div`
  color: #797979;
`;

const ProfileBody = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const FollowCount = styled.span`
  color: #797979;
  font-size: 0.85rem;
`;

const CountText = styled.span`
  color: #303030;
  font-weight: 700;
  font-size: 1rem;
`;

const TextWrap = styled.span`
  &:hover: {
    text-decoration: underline;
  }
`;
