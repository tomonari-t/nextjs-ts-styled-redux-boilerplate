import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import '../styles/reset.scss'
import '../styles/global.scss'
import makeStore from '../redux/makeStore'

class MisApp extends App<{ store: any }> {
  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Head>
          <link
            href='https://fonts.googleapis.com/css?family=Noto+Sans+JP:100,400,500&display=swap&subset=japanese'
            rel='stylesheet'
          />
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(makeStore)(MisApp)
