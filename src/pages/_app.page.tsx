import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { memo } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '~/utils/theme'

const MyApp = (props: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <props.Component {...props.pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default memo(MyApp)
