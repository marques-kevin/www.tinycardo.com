export const getFavicon = (website?: string) => {
  return `https://www.google.com/s2/favicons?domain=${website?.replace(
    "sc-domain:",
    ""
  )}&sz=48`
}
