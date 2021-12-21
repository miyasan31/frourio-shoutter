import '~/styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { memo } from 'react';
import { RecoilRoot } from 'recoil';

import { AuthProvider } from '~/components';
import { theme } from '~/utils';

const MyApp = (props: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <AuthProvider>
          <props.Component {...props.pageProps} />
        </AuthProvider>
      </RecoilRoot>
    </ChakraProvider>
  );
};

export default memo(MyApp);
