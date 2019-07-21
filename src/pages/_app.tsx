import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import globalStyle from '../styles/global'

export const reducer = (
  state = { foo: '' },
  action: { type: string; payload: string },
) => {
  switch (action.type) {
    case 'FOO':
      return { ...state, foo: action.payload }
    default:
      return state
  }
}

const makeStore = (
  initialState: { foo: string } = { foo: 'start' },
  _: withRedux.StoreCreatorOptions<{ foo: string }, any, any, any, any>,
) => {
  return createStore(reducer, initialState)
}

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
        <style jsx global>
          {globalStyle}
        </style>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux<{ foo: string }>(makeStore as any)(MisApp)
