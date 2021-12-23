import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactNode, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { user } from '~/atoms';
import { IconButton } from '~/components';

const ICON_PHOTO_SIZE = 32;

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = (props) => {
  const userInfo = useRecoilValue(user);
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const notLayout = [
    '/signin',
    '/callback',
    '/signup',
    '/signup/follow'
  ].includes(router.pathname);

  return (
    <>
      {notLayout ? (
        <div>{props.children}</div>
      ) : (
        <LayoutStyle>
          <IconButtonWrap>
            <IconButton
              icon={<ArrowLeftIcon width={20} height={20} />}
              onClick={handleBack}
            />
            <UserName>{userInfo.name}</UserName>

            <UserIcon
              src={userInfo.icon || '/oden.jpg'}
              alt="Picture of the author"
              width={ICON_PHOTO_SIZE}
              height={ICON_PHOTO_SIZE}
            />
          </IconButtonWrap>
          <Tabs isFitted>
            <TabList>
              <Link href="/">
                <Tab>ホーム</Tab>
              </Link>
              <Link href={`/${userInfo.id}`}>
                <Tab>プロフィール</Tab>
              </Link>
            </TabList>
            <TabPanels>
              <div>{props.children}</div>
            </TabPanels>
          </Tabs>
        </LayoutStyle>
      )}
    </>
  );
};

const LayoutStyle = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding-bottom: 200px;
  overscroll-behavior-y: none;

  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
`;

const IconButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 1rem;
  border-bottom: 1px solid #ccc;
`;

const UserName = styled.div`
  font-weight: bold;
`;

const UserIcon = styled(image)`
  border-radius: 9999px;
`;
