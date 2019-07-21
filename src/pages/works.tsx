import { withRouter, RouterProps } from 'next/router'

type Props = { router: RouterProps }

const Works = (_: Props) => {
  return <div>works</div>
}

export default withRouter(Works)
