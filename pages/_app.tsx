import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { memo } from 'react'

const MyApp = (props: AppProps) => {
  return (
    <RecoilRoot>
      <props.Component {...props.pageProps} />
    </RecoilRoot>
  )
}

export default memo(MyApp)
