import { useRouter } from 'next/router';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { user } from '~/atoms';
import { Progress } from '~/components/Progress';
import { auth0, differentAudienceOptions } from '~/constants';
import { apiClient } from '~/utils';

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = (props) => {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(user);
  const [isLoading, setIsLoading] = useState(true);

  const listenAuthState = useCallback(async () => {
    try {
      // トークンを取得
      const token = await auth0.getTokenSilently(differentAudienceOptions);
      // データベースにユーザー情報が存在するか確認

      if (token) {
        // 認証ユーザー情報を取得
        const user = await auth0.getUser(differentAudienceOptions);
        const result = await apiClient.user._email(user?.email || '').get({
          headers: { authorization: `Bearer ${token}` }
        });

        // ユーザー情報が存在しなかったらサインアップ画面にリダイレクト
        if (!result.body.user) {
          router.push('/signup');
        } else {
          // ユーザー情報が存在したらユーザー情報をセット
          setUserInfo({
            ...result.body.user,
            isSignin: true
          });
        }
      }
      setIsLoading(false);
    } catch (e) {
      router.push('/signin');
    }
  }, []);

  const notLayout =
    router.pathname === '/signin' ||
    router.pathname === '/callback' ||
    router.pathname === '/signup';

  useEffect(() => {
    if (notLayout) {
      setIsLoading(false);
      return;
    }
    listenAuthState();
  }, []);

  if (isLoading) return <Progress h="200px" />;

  return <>{props.children}</>;
};
