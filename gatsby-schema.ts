import { GatsbyNode } from "gatsby"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions, schema }) => {
    const { createTypes } = actions

    createTypes([
      `
      type Global__Cms__Link {
        label: String
        url: String
        target: String
        rel: String
      }
  
      type Global__Meta__Seo {
        title: String
        description: String
        indexable: Boolean
        image: Global__Cms__Image
      }
  
      type Global__Cms__Image {
        src: File @fileByRelativePath
        alt: String
      }
      `,

      schema.buildObjectType({
        name: "Fields",
        fields: {
          slug: "String",
          type: "String",
        },
      }),

      schema.buildObjectType({
        name: "TextWithHtmlTag",
        fields: {
          value: "String",
          component: "String",
        },
      }),

      schema.buildObjectType({
        name: "Frontmatter",
        fields: {
          type: "String",
        },
      }),

      // CMS
      schema.buildObjectType({
        name: "MarketingCloud",
        fields: {
          type: "String!",
          label: "TextWithHtmlTag",
          title: "TextWithHtmlTag",
          description: "String",
          cloud: "[Global__Cms__Image]",
        },
      }),

      schema.buildObjectType({
        name: "MarketingHero",
        fields: {
          type: "String!",
          label: "TextWithHtmlTag",
          title: "TextWithHtmlTag",
          image: "Global__Cms__Image",
          description: "String",
        },
      }),

      schema.buildObjectType({
        name: "MarketingTitle",
        fields: {
          type: "String!",
          title: "TextWithHtmlTag",
        },
      }),

      schema.buildObjectType({
        name: "MarketingText",
        fields: {
          type: "String!",
          value: "String",
        },
      }),

      schema.buildObjectType({
        name: "MarketingAuthor",
        fields: {
          type: "String!",
          name: "String",
          illustration: "Global__Cms__Image",
        },
      }),

      schema.buildObjectType({
        name: "MarketingDiscover",
        fields: {
          type: "String!",
          label: "TextWithHtmlTag",
          title: "TextWithHtmlTag",
          image: "Global__Cms__Image",
          description: "String",
          to: "Global__Cms__Link",
        },
      }),

      `type ArticleContentVideo {
        type:  String!
        src: File @fileByRelativePath
        ring: String
        illustration: File @fileByRelativePath
        alt: String
        autoplay: Boolean
      }`,

      `
      
      type MarketingVideo {
        type:  String!
        src: File @fileByRelativePath
        illustration: File @fileByRelativePath
        alt: String
        autoplay: Boolean
      }
      
      type GlobalVideo {
        src: File @fileByRelativePath
        illustration: File @fileByRelativePath
        alt: String
        autoplay: Boolean
      }
      `,

      `type ArticleRecipeIngredientItem {
        value: String
        quantity: Int
        weight: String
        url: String
      }`,

      `type ArticleRecipeIngredient {
        portions: Int
        items: [ArticleRecipeIngredientItem]
      }`,

      `type ArticleRecipeToolItem {
        value: String
        quantity: Int
        url: String
      }`,

      `type ArticleRecipeStep {
        content: String
        name: String
        illustration: Global__Cms__Image
      }`,

      schema.buildObjectType({
        name: "ArticleRecipe",
        fields: {
          type: "String!",
          name: "String",
          calories: "Int",
          description: "String",
          illustration: "Global__Cms__Image",
          difficulty: "String",
          preparationDuration: "Int",
          cookDuration: "Int",
          recipeCuisine: "String",
          recipeCategory: "String",
          keywords: "String",
          ingredients: "ArticleRecipeIngredient",
          tools: "[ArticleRecipeToolItem]",
          steps: "[ArticleRecipeStep]",
        },
      }),

      `
      type Faq {
        question: String
        answer: String
        component: String
      }


  
      type MarketingFaqCta {
        visible: Boolean
        title: TextWithHtmlTag
        description: String
        button: Global__Cms__Link
      }
  
      type MarketingContactInlineItem {
        type: String
        label: String
        description: String
        information: String
      }
      `,

      schema.buildObjectType({
        name: "MarketingContactInline",
        fields: {
          type: "String!",
          informations: "[MarketingContactInlineItem]",
        },
      }),

      schema.buildObjectType({
        name: "MarketingFaq",
        fields: {
          type: "String!",
          title: "TextWithHtmlTag",
          items: "[Faq]",
        },
      }),

      schema.buildObjectType({
        name: "MarketingPricing",
        fields: {
          type: "String!",
          show: "Boolean",
          scope: "String",
        },
      }),

      schema.buildObjectType({
        name: "MarketingTestimonials",
        fields: {
          type: "String!",
          show: "Boolean",
        },
      }),

      schema.buildObjectType({
        name: "MarketingFaq",
        fields: {
          type: "String!",
          show: "Boolean",
        },
      }),

      `type MarketingNewsletterInput {
        placeholder: String
        method: String
        action: String
      }`,

      schema.buildObjectType({
        name: "MarketingNewsletter",
        fields: {
          type: "String!",
          title: "TextWithHtmlTag",
          description: "String",
          button: "String",
          input: "MarketingNewsletterInput",
        },
      }),

      `
      type MarketingRelatedArticlesItem {
        id: String
      }
      `,

      schema.buildObjectType({
        name: "MarketingFeature",
        fields: {
          description: "String",
          title: "TextWithHtmlTag",
          video: "GlobalVideo",
        },
      }),

      schema.buildObjectType({
        name: "MarketingFeatures",
        fields: {
          type: "String!",
          label: "TextWithHtmlTag",
          title: "TextWithHtmlTag",
          description: "String",
          features: "[MarketingFeature]",
        },
      }),

      schema.buildObjectType({
        name: "MarketingRelatedArticles",
        fields: {
          type: "String!",
          title: "TextWithHtmlTag",
          label: "TextWithHtmlTag",
          description: "String",
          articles: "[MarketingRelatedArticlesItem]",
        },
      }),

      `
        type MarketingProductOfTheDay {
          type: String!
          id: String
        }

      type MarketingAnnouncementBadge {
        type: String!
        announcement_badge_label: String
      }

      type MarketingButtonItem {
        type: String!
        label: String
        url: String
        size: String
        variant: String
      }

      type MarketingButtons {
        type: String!
        buttons: [MarketingButtonItem]
      }

      type MarketingUsersAndStars {
        type: String!
      }

      type MarketingSitemaps {
        type: String!
      }

      type MarketingSimpleFeaturesItem {
        name: String
        description: String
      } 

      type MarketingSimpleFeatures {
        type: String!
        label: TextWithHtmlTag
        title: TextWithHtmlTag
        description: String
        features: [MarketingSimpleFeaturesItem]
      }
      `,

      schema.buildUnionType({
        name: `PageContent`,
        types: [
          `MarketingHero`,
          `MarketingProductOfTheDay`,
          `MarketingTitle`,
          `MarketingText`,
          `MarketingAuthor`,
          "MarketingVideo",
          "MarketingSitemaps",
          "MarketingPricing",
          "MarketingFeatures",
          "MarketingFaq",
          "MarketingTestimonials",
          "MarketingAnnouncementBadge",
          "MarketingButtons",
          "MarketingUsersAndStars",
          "MarketingSimpleFeatures",
        ],
        resolveType: (value) => {
          if (value.type === "marketing/hero") return "MarketingHero"
          if (value.type === "marketing/product-of-the-day")
            return "MarketingProductOfTheDay"
          if (value.type === "marketing/announcement-badge")
            return "MarketingAnnouncementBadge"
          if (value.type === "marketing/title") return "MarketingTitle"
          if (value.type === "marketing/text") return "MarketingText"
          if (value.type === "marketing/author") return "MarketingAuthor"
          if (value.type === "marketing/video") return "MarketingVideo"
          if (value.type === "marketing/pricing") return "MarketingPricing"
          if (value.type === "marketing/sitemaps") return "MarketingSitemaps"
          if (value.type === "marketing/testimonials")
            return "MarketingTestimonials"
          if (value.type === "marketing/features") return "MarketingFeatures"
          if (value.type === "marketing/faq") return "MarketingFaq"
          if (value.type === "marketing/buttons") return "MarketingButtons"
          if (value.type === "marketing/users-and-stars")
            return "MarketingUsersAndStars"
          if (value.type === "marketing/simple-features")
            return "MarketingSimpleFeatures"

          throw new Error(
            `GraphQl/Schema/ResolveType: ${value.type} is not resolved`
          )
        },
      }),

      schema.buildUnionType({
        name: `NewsContent`,
        types: [
          `ArticleContentRichText`,
          `ArticleContentVideo`,
          `ArticleContentImage`,
          "ArticleContentTitle",
        ],
        resolveType: (value) => {
          if (value.type === "article/rich_text")
            return "ArticleContentRichText"
          if (value.type === "article/video") return "ArticleContentVideo"
          if (value.type === "article/title") return "ArticleContentTitle"
          if (value.type === "article/image") return "ArticleContentImage"

          throw new Error(
            `GraphQl/Schema/ResolveType: ${value.type} is not resolved`
          )
        },
      }),

      schema.buildObjectType({
        name: "PagesJson",
        interfaces: ["Node"],
        fields: {
          meta: "Global__Meta__Seo",
          type: "String",
          url: "String",
          lang: "String",
          updated_at: "Date",
          published_at: "Date",
          content: "[PageContent]",
        },
      }),

      schema.buildObjectType({
        name: "NewsJson",
        interfaces: ["Node"],
        fields: {
          type: "String",
          lang: "String",
          updated_at: "Date",
          published_at: "Date",
          content: "[NewsContent]",
        },
      }),
      `
      type ProductsButtonsJson {
        url: String
        label: String
        theme: String
      }
  
      type ArticleContentImage {
        type:  String!
        src: File @fileByRelativePath
        alt: String
        legend: String
      }
  
      type ArticleContentRichText {
        type: String!
        content: String
      }
  
      type ArticleQuote {
        type: String!
        text: String
        author: String
      }
  
      type ArticleContentTitle {
        type: String!
        value: String
        component: String
        faq: Boolean
      }
  
      type ArticleToc {
        type: String!
        title: TextWithHtmlTag
      }
  
      type FooterNetwork {
        target: String
        url: String
        rel: String
        network: String
      }
  
      type FooterTab {
        label: String
        url: String
        rel: String
        target: String
      }
  
      type Footer {
        type: String!
        logo: Global__Cms__Image
        markup: String
        tabs: [FooterTab]
        networks: [FooterNetwork]
      }
      `,
    ])
  }
