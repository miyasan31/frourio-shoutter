import { Tab, TabList, Tabs } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import type { FC } from 'react';

export const PROFILE_TAB = [
  { path: '', label: 'ツイート' },
  { path: 'retweet', label: 'リツイート' },
  { path: 'reply', label: 'リプライ' },
  { path: 'like', label: 'いいね' }
];

type Props = {
  userId: string;
};

export const ProfileTab: FC<Props> = (props) => {
  return (
    <Tabs isFitted>
      <TabList>
        {PROFILE_TAB.map((tab) => (
          <Link key={tab.label} href={`/${props.userId}/${tab.path}`}>
            <Anker>
              <Tab>{tab.label}</Tab>
            </Anker>
          </Link>
        ))}
      </TabList>
    </Tabs>
  );
};

const Anker = styled.a`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;
