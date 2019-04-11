import { withRouter, RouterProps } from 'next/router'
import styled from 'styled-components'
import { connect } from 'react-redux'

type State = { foo: string }

type Dispatch = { action: () => void }

type Props = { router: RouterProps } & State & Dispatch

function Page({ router, foo, action }: Props) {
  return (
    <IdContainer>
      {router.query && router.query.id} redux => {foo}
      <div>
        <button title={'action'} onClick={action}>
          Action
        </button>
      </div>
    </IdContainer>
  )
}

const IdContainer = styled.h1`
  text-align: center;
`

export default withRouter(
  connect<State, Dispatch, any, { foo: string }>(
    state => ({
      foo: state.foo,
    }),
    dispatch => ({
      action: () => dispatch({ type: 'FOO', payload: 'Redux' }),
    }),
  )(Page),
)
