import { GatsbyNode } from "gatsby"
import path from "path"
import { queryGraphql } from "./gatsby-query"
import { createSchemaCustomization } from "./gatsby-schema"
import languages from "./src/constants/languages.json"

import ar from "./src/i18n/messages/ar.json"
import de from "./src/i18n/messages/de.json"
import en from "./src/i18n/messages/en.json"
import es from "./src/i18n/messages/es.json"
import fr from "./src/i18n/messages/fr.json"
import it from "./src/i18n/messages/it.json"
import ja from "./src/i18n/messages/ja.json"
import ko from "./src/i18n/messages/ko.json"
import pt from "./src/i18n/messages/pt.json"
import ru from "./src/i18n/messages/ru.json"
import tr from "./src/i18n/messages/tr.json"
import zh from "./src/i18n/messages/zh.json"

const messages = { en, fr, es, de, it, ja, ko, pt, ru, tr, zh, ar }

const PageTemplate = path.resolve(`./src/templates/page.tsx`)

const normalize = (lang: string, url: string) => {
  const isHome = url === "home"

  if (isHome) {
    if (lang === "en") return `/`
    return `/${lang}/`
  }

  if (lang === "en") return `/${url}/`
  return `/${lang}/${url}/`
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  const result = await queryGraphql({ graphql, reporter })

  const pages = result.data.pages.nodes.map((page) => {
    return {
      ...page,
    }
  })

  pages.forEach((page) => {
    createPage({
      path: normalize(page.lang, page.url),
      component: PageTemplate,
      context: {
        langKey: page.lang,
        messages: messages[page.lang],
        languages,
        stats: {},
        updated_at: page.updated_at,
        canonicals: pages
          .filter(({ url }) => {
            return page.url === url
          })
          .map(({ url, lang }) => {
            return {
              lang,
              url: normalize(lang, url),
              isDefault: lang === "en",
            }
          }),
        meta: page.meta,
        content: page.content,
      },
    })
  })
}

export { createSchemaCustomization }

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  })
}
