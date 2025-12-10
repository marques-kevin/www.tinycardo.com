import { RedirectPage } from "@/routes/redirect"
import { RouteComponentProps } from "@reach/router"
import React from "react"

const RedirectRoute: React.FC<RouteComponentProps> = (props) => {
  return <RedirectPage {...props} />
}

// eslint-disable-next-line no-restricted-exports
export default RedirectRoute
