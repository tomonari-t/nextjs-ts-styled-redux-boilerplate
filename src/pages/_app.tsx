// pages/_app.js
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'

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

class MyApp extends App<{ store: any }> {
  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux<{ foo: string }>(makeStore as any)(MyApp)
