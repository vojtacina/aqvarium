import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

import '../styles/index.scss'
import '../styles/extend.scss'
import MainContext from 'components/contexts/MainContext'


function MyApp({ Component, pageProps }: AppProps) {



  return (

    <Provider session={pageProps.session}>
      <MainContext>
        <Component {...pageProps} />
      </MainContext>
    </Provider>

  )
}

export default MyApp