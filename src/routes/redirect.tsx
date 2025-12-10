import { languagesAvailable } from "@/constants/langs"
import { RouteComponentProps } from "@reach/router"
import React, { useEffect } from "react"

const getLangFromNavigator = (lang: string) => {
  const langWithoutLocale = lang.split("-")[0]

  if (languagesAvailable.includes(langWithoutLocale)) return langWithoutLocale

  return "en"
}

export const RedirectPage: React.FC<RouteComponentProps> = (props) => {
  useEffect(() => {
    const lang = getLangFromNavigator(navigator.language)

    if (lang === "en") {
      window.location.replace(`/${props["*"]}${window.location.hash}`)
    } else {
      window.location.replace(`/${lang}/${props["*"]}${window.location.hash}`)
    }
  }, [])

  return <div className="loading loading-spinner loading-lg"></div>
}
