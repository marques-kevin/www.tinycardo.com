export const queryGraphql = async ({ graphql, reporter }) => {
  const result = await graphql(
    `
      {
        navbars: allNavbarJson {
          nodes {
            lang
            tabs {
              label
              link
            }
            right_tabs {
              label
              link
            }
          }
        }

        news: allNewsJson {
          edges {
            node {
              content {
                ... on ArticleContentRichText {
                  content
                  type
                }
                ... on ArticleContentVideo {
                  alt
                  autoplay
                  type
                  src {
                    publicURL
                  }
                  illustration {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                ... on ArticleContentImage {
                  alt
                  legend
                  type
                  src {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                ... on ArticleContentTitle {
                  value
                  component
                }
              }
              lang
              title
              published_at
              updated_at
              description
              id: jsonId
            }
          }
        }

        pages: allPagesJson {
          nodes {
            id
            meta {
              description
              indexable
              title
            }
            content {
              ... on MarketingHero {
                description
                type
                buttons {
                  label
                  type
                  url
                  size
                  variant
                }
                title {
                  component
                  value
                }
                label {
                  component
                  value
                }
              }

              ... on MarketingTitle {
                __typename
                title {
                  component
                  value
                }
                type
              }

              ... on MarketingSitemaps {
                __typename
                type
              }

              ... on MarketingText {
                __typename
                value
                type
              }

              ... on MarketingFeatures {
                description
                type
                title {
                  value
                  component
                }
                label {
                  component
                  value
                }
                features {
                  title {
                    component
                    value
                  }
                  description
                  video {
                    alt
                    autoplay
                    src {
                      publicURL
                    }
                    illustration {
                      childImageSharp {
                        gatsbyImageData(
                          width: 800
                          placeholder: BLURRED
                          formats: [AUTO, WEBP]
                        )
                      }
                    }
                  }
                }
              }

              ... on MarketingAnnouncementBadge {
                __typename
                type
                announcement_badge_label
              }

              ... on MarketingVideo {
                __typename
                type
                alt
                autoplay
                src {
                  publicURL
                }
                illustration {
                  childImageSharp {
                    gatsbyImageData(
                      width: 1200
                      placeholder: BLURRED
                      formats: [AUTO, WEBP]
                    )
                  }
                }
              }

              ... on MarketingAuthor {
                name
                type
                illustration {
                  alt
                  src {
                    childImageSharp {
                      gatsbyImageData(
                        width: 100
                        placeholder: BLURRED
                        formats: [AUTO, WEBP]
                      )
                    }
                  }
                }
              }

              ... on MarketingPricing {
                __typename
                type
                show
                scope
              }

              ... on MarketingTestimonials {
                __typename
                type
                show
              }

              ... on MarketingProductOfTheDay {
                __typename
                type
              }

              ... on MarketingFaq {
                __typename
                type
                title {
                  component
                  value
                }
                items {
                  question
                  answer
                  component
                }
              }

              ... on MarketingButtons {
                __typename
                type
                buttons {
                  label
                  type
                  url
                  size
                  variant
                }
              }

              ... on MarketingSimpleFeatures {
                __typename
                type
                label {
                  component
                  value
                }
                title {
                  component
                  value
                }
                description
                features {
                  name
                  description
                }
              }

              ... on MarketingUsersAndStars {
                __typename
                type
              }
            }
            lang
            published_at
            updated_at
            url
            type
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )

    return result
  }

  return result
}
