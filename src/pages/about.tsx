import { withRouter, RouterProps } from 'next/router'

type Props = { router: RouterProps }

const About = (_: Props) => {
  return <div>about</div>
}

export default withRouter(About)
