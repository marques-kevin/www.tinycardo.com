const add_trailing_slash = (url: string) => {
  if (url.endsWith("/")) return url
  return url + "/"
}

export const normalizeUrl = (params: {
  url: string
  locale: string
  removeLocaleIfExists?: boolean
}) => {
  if (params.url.startsWith("http") && !params.url.includes("foudroyer"))
    return params.url

  if (params.url.startsWith("#")) {
    return `${params.url}`
  }

  if (params.removeLocaleIfExists) {
    if (params.url.match(/^\/[a-z]{2}\//)) {
      if (params.locale === "en")
        return add_trailing_slash(params.url.replace(/^\/[a-z]{2}\//, `/`))

      return add_trailing_slash(
        params.url.replace(/^\/[a-z]{2}\//, `/${params.locale}/`)
      )
    }
  }

  if (params.url.startsWith("/dashboard/")) {
    return add_trailing_slash(params.url)
  }

  if (params.url.startsWith("/")) {
    if (params.locale === "en") return add_trailing_slash(`${params.url}`)
    if (params.url.startsWith("/"))
      return add_trailing_slash(`/${params.locale}${params.url}`)
  }

  const { origin, pathname } = new URL(params.url)

  if (params.locale === "en") return add_trailing_slash(origin + pathname)

  return add_trailing_slash(origin + "/" + params.locale + pathname)
}
