import { Seo } from "@/components/general/Seo/Seo"
import { MarketingAIExplainerModal } from "@/modules/marketing/components/marketing_ai_explainer_modal/marketing_ai_explainer_modal"
import { MarketingFooter } from "@/modules/marketing/components/marketing_footer/marketing_footer"
import { MarketingMainHero } from "@/modules/marketing/components/marketing_main_hero/marketing_main_hero"
import { MarketingNavbar } from "@/modules/marketing/components/marketing_navbar/marketing_navbar"
import { MarketingTtsModal } from "@/modules/marketing/components/marketing_tts_modal/marketing_tts_modal"

function Page(props) {
  return (
    <>
      <Seo
        title={props.pageContext.meta.title}
        description={props.pageContext.meta.description}
        lang={props.pageContext.langKey}
        langUrls={[]}
      />

      <main className="space-y-8">
        <MarketingNavbar />
        <MarketingMainHero />
      </main>

      <MarketingAIExplainerModal />
      <MarketingTtsModal />
      <MarketingFooter />
    </>
  )
}

// eslint-disable-next-line no-restricted-exports
export default Page
