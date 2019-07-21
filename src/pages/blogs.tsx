import { withRouter, RouterProps } from 'next/router'

type Props = { router: RouterProps }

const Blogs = (_: Props) => {
  return <div>blogss</div>
}

export default withRouter(Blogs)
