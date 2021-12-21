import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { memo } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '~/utils'
import { AuthProvider } from '~/components'

const MyApp = (props: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <AuthProvider>
          <props.Component {...props.pageProps} />
        </AuthProvider>
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default memo(MyApp)
