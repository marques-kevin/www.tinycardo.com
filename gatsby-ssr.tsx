import React from "react"
import wrapWithIntl from "./wrap-page-element"
import wrapWithProvider from "./wrap-root-element"

export const wrapRootElement = wrapWithProvider
export const wrapPageElement = wrapWithIntl

export const onPreRenderHTML = (props) => {
  const headComponents = props.getHeadComponents().map((component) => {
    if (component.props?.["data-identity"] === "gatsby-global-css") {
      return <link rel="stylesheet" href={component.props["data-href"]}></link>
    }

    return component
  })

  headComponents.push(
    <link rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />,
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />,
  )
  

  headComponents.sort((x, y) => {
    if (x.key === "gatsby-image-style") return -1
    return 0
  })

  props.replaceHeadComponents(headComponents)
}

export const onRenderBody = ({ setHeadComponents, setBodyAttributes }) => {
  const headComponents = []

  setBodyAttributes({
    className: "font-display antialiased",
  })

  return setHeadComponents(headComponents)
}


