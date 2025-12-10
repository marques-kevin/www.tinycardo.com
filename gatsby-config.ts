import type { GatsbyConfig } from "gatsby"
import path from "path"

const URL = "https://www.foudroyer.com"

const config: GatsbyConfig = {
  siteMetadata: {
    url: URL,
    siteUrl: URL,
    favicon: `/favicon.png`,
    author: "Kevin Marques",
    image: "/og/en.jpg",
    twitterUsername: "KM_Marques",
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-provide-react",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/logo/icon.png",
        name: `Foudroyer`,
        short_name: `Foudroyer`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#fbcfe8`,
        display: `standalone`,
      },
    },

    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `./cms/pages`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "news",
        path: `./cms/news`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./src/assets/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./cms/assets/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: require("./src/robots").concat(["no-index"]),
        createLinkInHead: false,
        entryLimit: 5000,
        resolveSiteUrl: () => URL,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map((page) => {
            if (page.path.endsWith("]/")) {
              return { path: "no-index" }
            }

            if (page.path.includes("dashboard")) {
              return { path: "no-index" }
            }

            if (page.path.includes("administration")) {
              return { path: "no-index" }
            }

            if (page.path.includes("authentication")) {
              return { path: "no-index" }
            }

            if (page.path.includes("/user/")) {
              return { path: "no-index" }
            }

            if (page?.pageContext?.meta?.indexable === false)
              return { path: "no-index" }

            return { ...page, lastmod: page.updated_at }
          })
        },
        filterPages: ({ path }) => {
          if (path.includes("administration")) return true
          if (path.includes("upsell")) return true
          if (path.includes("no-index")) return true
          return false
        },
        serialize: ({ path, lastmod }) => {
          return {
            url: path,
            lastmod,
            priority: lastmod ? 1 : 1,
          }
        },
        query: `
        {
          allSitePage {
            nodes {
              path
              pageContext
            }
          }
        }
      `,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: URL,
        sitemap: `${URL}/sitemap/sitemap-index.xml`,
        policy: [{ userAgent: "*", disallow: require("./src/robots") }],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/logo/icon.png",
        name: `Foudroyer`,
        short_name: `Foudroyer`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#fbcfe8`,
        display: `standalone`,
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./src/assets/",
      },
      __key: "assets",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-plugin-umami`,
      options: {
        websiteId: process.env.GATSBY_UMAMI_WEBSITE_ID,
        includeInDevelopment: false,
        autoTrack: true,
        respectDoNotTrack: true,
        dataCache: false,
        dataDomains: "www.tinycardo.com",
      },
    },
  ],
}

if (process.env.NODE_ENV === "production") {
  config.plugins?.push({
    resolve: "@sentry/gatsby",
    options: {
      dsn: "https://f6d6eb4963584afc93e51f7d3136b07e@o1172147.ingest.sentry.io/6267024",
    },
  })
}

if (process.env.NODE_ENV !== "production") {
  config.plugins?.push({
    resolve: "gatsby-plugin-netlify-cms",
    options: {
      modulePath: `${path.resolve(__dirname)}/src/admin/index.tsx`,
      manualInit: true,
    },
  })
}

// eslint-disable-next-line no-restricted-exports
export default config
