import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { user } from '~/atoms';
import { getToken } from '~/functions';
import { apiClient } from '~/utils';

import { Form } from './Form';

type Props = {
  userId: string;
  revalidate: () => Promise<boolean>;
};

export const ReplyForm: FC<Props> = (props) => {
  const router = useRouter();
  const { tweetId } = router.query;
  const userInfo = useRecoilValue(user);

  const handlePostTweet = useCallback(
    async (data) => {
      const token = await getToken();
      await apiClient.reply.post({
        headers: { authorization: `Bearer ${token}` },
        body: {
          reply: data.reply,
          tweet: { connect: { id: Number(tweetId) } },
          user: { connect: { id: userInfo.id } }
        }
      });
      props.revalidate();
    },
    [userInfo, tweetId]
  );

  return (
    <Form type="reply" onPost={handlePostTweet}>
      <SentUserIdWrap>
        返信先{':'}
        <SentUserId>
          {'@'}
          {props.userId}
        </SentUserId>
        さん
      </SentUserIdWrap>
    </Form>
  );
};

const SentUserIdWrap = styled.div`
  padding-left: 3.75rem;
  color: #4b4b4b;
`;

const SentUserId = styled.span`
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  color: #4992ff;
`;
