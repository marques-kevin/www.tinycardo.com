type HtmlTagElementEntity = {
  component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
  value: string
}

export type MarketingHeroEntity = {
  type: "marketing/hero"
  label?: HtmlTagElementEntity
  title: HtmlTagElementEntity
  description: string
}

type FaqItem = {
  question: string
  answer: string
  component: HtmlTagElementEntity["component"]
}

export type MarketingSitemapsEntity = {
  type: "marketing/sitemaps"
  label: HtmlTagElementEntity
  title: HtmlTagElementEntity
  description: string
}

export type FaqEntity = {
  type: "marketing/faq"
  title: HtmlTagElementEntity
  items: FaqItem[]
}

export type MarketingVideoEntity = {
  type: "marketing/video"
  alt: string
}

export type MarketingTitleEntity = {
  type: "marketing/title"
  title: HtmlTagElementEntity
}

export type MarketingTextEntity = {
  type: "marketing/text"
  value: string
}

export type MarketingFeaturesItem = {
  title: HtmlTagElementEntity
  description: string
  video: {
    alt?: string
    autoplay?: boolean
    illustration?: any
    src?: {
      publicURL: string
    }
  }
}

export type MarketingSimpleFeaturesItem = {
  name: string
  description: string
}

export type MarketingSimpleFeaturesEntity = {
  type: "marketing/simple-features"
  label: HtmlTagElementEntity
  title: HtmlTagElementEntity
  description: string
  features: MarketingSimpleFeaturesItem[]
}

export type MarketingFeaturesEntity = {
  type: "marketing/features"
  title: HtmlTagElementEntity
  description: string
  label: HtmlTagElementEntity
  features?: MarketingFeaturesItem[]
}

export type ArticleTocEntity = {
  type: "article/toc"
  title: HtmlTagElementEntity
}

export type ArticleRichTextEntity = {
  type: "article/rich_text"
  content: string
}

export type ArticleImageEntity = {
  type: "article/image"
  image: {
    publicURL: string
  }
}

export type ArticleTitleEntity = {
  type: "article/title"
  value: string
  component: HtmlTagElementEntity["component"]
  faq?: FaqEntity[]
}

export type MarketingButtonItemEntity = {
  type: "authentication" | "other"
  size: "sm" | "md" | "lg"
  variant: "primary" | "secondary"
  url?: string | null
  label: string
}

export type MarketingButtonsEntity = {
  type: "marketing/buttons"
  buttons: MarketingButtonItemEntity[]
}

export type AnnouncementBadgeEntity = {
  type: "marketing/announcement-badge"
  announcement_badge_label: string
}

export type PageEntity = {
  id: string
  published_at: Date
  updated_at: Date
  meta: any
  lang: string
  content: Array<
    | FaqEntity
    | MarketingHeroEntity
    | MarketingVideoEntity
    | MarketingTitleEntity
    | MarketingTextEntity
    | MarketingFeaturesEntity
    | ArticleTocEntity
    | ArticleRichTextEntity
    | ArticleImageEntity
    | ArticleTitleEntity
    | MarketingButtonsEntity
    | AnnouncementBadgeEntity
    | MarketingSimpleFeaturesEntity
    | MarketingSitemapsEntity
  >
}
