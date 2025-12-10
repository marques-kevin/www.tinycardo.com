import dayjs from "dayjs"
import "dayjs/locale/ar"
import "dayjs/locale/de"
import "dayjs/locale/en"
import "dayjs/locale/es"
import "dayjs/locale/fr"
import "dayjs/locale/it"
import "dayjs/locale/ja"
import "dayjs/locale/ko"
import "dayjs/locale/pt"
import "dayjs/locale/ru"
import "dayjs/locale/tr"
import "dayjs/locale/zh"

import React from "react"

import { IntlProvider } from "react-intl"

const setDayjsLocale = (lang: string) => {
  dayjs.locale(lang)
}

export function CustomIntlProvider(props: {
  langKey: string
  children: React.ReactNode
  messages: Record<string, string>
}) {
  setDayjsLocale(props.langKey)

  return (
    // @ts-expect-error - TODO: fix this
    <IntlProvider locale={props.langKey} messages={props.messages}>
      {/* @ts-expect-error - TODO: fix this */}
      {props.children}
    </IntlProvider>
  )
}
