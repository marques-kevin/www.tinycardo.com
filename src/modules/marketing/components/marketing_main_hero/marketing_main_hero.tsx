import { As } from "@/components/general/As/As"
import type { MarketingHeroEntity } from "@/entities/PageEntity"
import { MarketingMainHeroDeck } from "@/modules/marketing/components/marketing_main_hero_deck/marketing_main_hero_deck"
import { useIntl } from "react-intl"

const BackgroundGradient = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 -z-10 size-full stroke-base-content/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
  >
    <defs>
      <pattern
        x="50%"
        y={-1}
        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
        width={200}
        height={200}
        patternUnits="userSpaceOnUse"
      >
        <path d="M100 200V.5M.5 .5H200" fill="none" />
      </pattern>
    </defs>
    <svg x="50%" y={-1} className="overflow-visible fill-primary/10">
      <path
        d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
        strokeWidth={0}
      />
    </svg>
    <rect
      fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
      width="100%"
      height="100%"
      strokeWidth={0}
    />
  </svg>
)

function Label(props: MarketingHeroEntity["label"]) {
  return (
    <As
      component={props!.component}
      className="rounded-box inline-flex items-center border-2 px-4 py-2"
    >
      {props!.value}
    </As>
  )
}

function Title(props: MarketingHeroEntity["title"]) {
  return (
    <As
      component={props.component}
      className="mt-10 text-5xl font-semibold tracking-tight sm:text-7xl"
    >
      {props.value}
    </As>
  )
}

function Description(props: { value: string }) {
  return (
    <p className="mt-8 text-lg font-medium text-base-content/70 sm:text-xl/8">
      {props.value}
    </p>
  )
}

function Actions() {
  const { formatMessage } = useIntl()

  return (
    <div className="mt-10 flex items-center gap-x-6">
      <a href="https://app.tinycardo.com" className="btn btn-primary btn-lg">
        {formatMessage({ id: "hero/actions/get-started" })}
      </a>
    </div>
  )
}

export function MarketingMainHero(props: MarketingHeroEntity) {
  return (
    <div className="relative isolate pt-24">
      <BackgroundGradient />

      <div className="mx-auto max-w-7xl px-6 py-8 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          {props.label && <Label {...props.label} />}
          <Title {...props.title} />
          <Description value={props.description} />
          <Actions />
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
          <div className="relative mx-auto w-full max-w-md">
            <MarketingMainHeroDeck />
          </div>
        </div>
      </div>
    </div>
  )
}
