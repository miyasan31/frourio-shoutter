import { auth0, loginWithRedirectOprions } from '~/constants';

// ログイン処理
export const handleSignin = async () => {
  await auth0.loginWithRedirect(loginWithRedirectOprions);
};
