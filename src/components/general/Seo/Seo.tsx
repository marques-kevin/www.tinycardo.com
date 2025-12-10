import { FaqEntity } from "@/entities/PageEntity"
import { useLocation } from "@reach/router"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

type Breadcrumb = { label: string; url: string }

const getBreadcrumb = (breadcrumbs: Breadcrumb[], endpoint) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map(({ label, url }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: label,
      item: `${endpoint}${url}`,
    })),
  }
}

export const getFaq = (faqs: FaqEntity["items"]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs?.map(({ question, answer }, index) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  }
}

export const Seo: React.FC<{
  title: string
  description: string
  lang: string
  article?: boolean
  breadcrumbs?: Array<Breadcrumb>
  index?: boolean
  langUrls: Array<{ lang: string; url: string; isDefault: boolean }>
}> = ({ title, description, breadcrumbs, index = true, lang, langUrls }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  const { siteUrl, favicon, twitterUsername } = site.siteMetadata

  const seo = {
    title,
    favicon: favicon,
    description: description,
    image: `https://api.my-search-console.com/og/?url=${siteUrl}${pathname}`,
    url: `${siteUrl}${pathname}`,
  }

  const defaultLangUrl = langUrls.find((lang) => lang.isDefault === true)

  return (
    <Helmet title={seo.title} htmlAttributes={{ lang }}>
      {langUrls.map(({ lang, url }) => (
        <link rel="alternate" hrefLang={lang} href={siteUrl + url} key={lang} />
      ))}

      <link
        rel="alternate"
        hrefLang={"x-default"}
        href={siteUrl + defaultLangUrl?.url}
      />

      <meta name="theme-color" content="#fbcfe8" />

      <link rel="icon" href={seo.favicon} />

      <meta name="viewport" content="width=device-width, user-scalable=no" />

      <meta name="description" content={seo.description} />

      <meta name="image" content={seo.image} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {!index && <meta name="robots" content="noindex" />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {breadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumb(breadcrumbs, siteUrl))}
        </script>
      )}
    </Helmet>
  )
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
        favicon
      }
    }
  }
`
