import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { auth0, differentAudienceOptions } from '~/constants';

export const useGetAccessToken = () => {
  const router = useRouter();
  const [token, setToken] = useState('');

  const listenAuthState = useCallback(async () => {
    try {
      // アクセストークン(JWT)
      if (router.pathname !== '/signin') {
        const accessToken = await auth0.getTokenSilently(
          differentAudienceOptions
        );
        // console.log('accessToken', accessToken)
        setToken(accessToken);

        // ユーザー情報
        // const user = await auth0.getUser(differentAudienceOptions)
        // console.log('user', user)

        // const claims = await auth0.getIdTokenClaims(differentAudienceOptions)
        // ユーザー情報とIdTokenが取れる
        // console.log('claims', claims)
        // デコードするとユーザー情報が取れる
        // console.log(',claims?.__raw', claims?.__raw)
      }
    } catch (error) {
      router.push('/signin');
    }
  }, [router]);

  useEffect(() => {
    listenAuthState();
  }, []);

  return { token };
};
