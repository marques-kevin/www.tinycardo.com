import { Seo } from "@/components/general/Seo/Seo"
import type { PageEntity } from "@/entities/PageEntity"
import { MarketingButtons } from "@/modules/marketing/components/buttons/buttons"
import { Faq } from "@/modules/marketing/components/faq/faq"
import { Features } from "@/modules/marketing/components/features/features"
import { MarketingAIExplainerModal } from "@/modules/marketing/components/marketing_ai_explainer_modal/marketing_ai_explainer_modal"
import { MarketingFooter } from "@/modules/marketing/components/marketing_footer/marketing_footer"
import { MarketingMainHero } from "@/modules/marketing/components/marketing_main_hero/marketing_main_hero"
import { MarketingNavbar } from "@/modules/marketing/components/marketing_navbar/marketing_navbar"
import { MarketingTtsModal } from "@/modules/marketing/components/marketing_tts_modal/marketing_tts_modal"
import { SimpleFeatures } from "@/modules/marketing/components/simple-features/simple-features"
import { Title } from "@/modules/marketing/components/title/title"

type NavbarEntity = {
  tabs: Array<{
    label: string
    link: string
  }>
  right_tabs: Array<{
    label: string
    link: string
  }>
}

function Page(props: {
  pageContext: PageEntity & { langKey: string; navbar: NavbarEntity }
}) {
  console.log(props)

  return (
    <>
      <Seo
        title={props.pageContext.meta.title}
        description={props.pageContext.meta.description}
        lang={props.pageContext.langKey}
        langUrls={[]}
      />

      <main className="space-y-8">
        <MarketingNavbar
          tabs={props.pageContext.navbar.tabs}
          right_tabs={props.pageContext.navbar.right_tabs}
        />

        {props.pageContext.content.map((content, index) => {
          if (content.type === "marketing/simple-features") {
            return <SimpleFeatures key={index} {...content} index={index} />
          }

          if (content.type === "marketing/buttons") {
            return <MarketingButtons key={index} {...content} />
          }

          if (content.type === "marketing/hero") {
            return <MarketingMainHero key={index} {...content} />
          }

          if (content.type === "marketing/title") {
            return <Title key={index} {...content} />
          }

          // if (content.type === "marketing/text") {
          //   return <Text key={index} value={content.value} />
          // }

          // if (content.type === "marketing/video") {
          //   return (
          //     <Video
          //       key={index}
          //       src={content.src.publicURL}
          //       illustration={content.illustration}
          //       alt={content.alt}
          //       autoplay={content.autoplay}
          //     />
          //   )
          // }

          // if (content.type === "marketing/author") {
          //   return (
          //     <Author
          //       key={index}
          //       illustration={content.illustration}
          //       name={content.name}
          //     />
          //   )
          // }

          if (content.type === "marketing/features") {
            return <Features {...content} key={index} invert={!(index % 2)} />
          }

          if (content.type === "marketing/faq") {
            return <Faq key={index} {...content} />
          }

          return content.type
        })}

        <MarketingAIExplainerModal />
        <MarketingTtsModal />
        <MarketingFooter />
      </main>
    </>
  )
}

// eslint-disable-next-line no-restricted-exports
export default Page
