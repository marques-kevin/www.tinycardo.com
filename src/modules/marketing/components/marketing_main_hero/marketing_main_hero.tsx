import { MarketingMainHeroDeck } from "@/modules/marketing/components/marketing_main_hero_deck/marketing_main_hero_deck"
import { ChevronRightIcon } from "lucide-react"
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

function Label() {
  const { formatMessage } = useIntl()

  return (
    <a className="rounded-box inline-flex items-center border-2 px-4 py-2">
      <span className="font-semibold text-accent-content">
        {formatMessage({ id: "hero/label/start" })}
      </span>
      <span aria-hidden="true" className="h-4 w-px mx-2 bg-base-content" />
      <span className="flex items-center gap-x-1">
        {formatMessage({ id: "hero/label/end" })}
        <ChevronRightIcon
          aria-hidden="true"
          className="-mr-2 size-5 text-base-content/70"
        />
      </span>
    </a>
  )
}

function Title() {
  const { formatMessage } = useIntl()

  return (
    <h1 className="mt-10 text-5xl font-semibold tracking-tight sm:text-7xl">
      {formatMessage({ id: "hero/title" })}
    </h1>
  )
}

function Description() {
  const { formatMessage } = useIntl()

  return (
    <p className="mt-8 text-lg font-medium text-base-content/70 sm:text-xl/8">
      {formatMessage({ id: "hero/description" })}
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

export function MarketingMainHero() {
  return (
    <div className="relative isolate pt-24">
      <BackgroundGradient />

      <div className="mx-auto max-w-7xl px-6 py-8 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <Label />
          <Title />
          <Description />
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
