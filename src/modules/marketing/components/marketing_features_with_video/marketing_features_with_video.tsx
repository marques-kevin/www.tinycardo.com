import { MessageI18nKeys } from "@/intl"
import { ServerIcon } from "@heroicons/react/20/solid"
import {
  ArchiveIcon,
  BedIcon,
  HeaterIcon,
  RulerDimensionLineIcon,
  WeightIcon,
} from "lucide-react"
import { useIntl } from "react-intl"

const features: {
  name: MessageI18nKeys
  description: MessageI18nKeys
  icon: React.ElementType
}[] = [
  {
    name: "marketing_features_with_video/features/muscles_heatmap/name",
    description:
      "marketing_features_with_video/features/muscles_heatmap/description",
    icon: HeaterIcon,
  },
  {
    name: "marketing_features_with_video/features/track_your_weight_progress/name",
    description:
      "marketing_features_with_video/features/track_your_weight_progress/description",
    icon: WeightIcon,
  },
  {
    name: "marketing_features_with_video/features/keep_a_complete_history/name",
    description:
      "marketing_features_with_video/features/keep_a_complete_history/description",
    icon: ArchiveIcon,
  },
  {
    name: "marketing_features_with_video/features/measure_your_body_parts/name",
    description:
      "marketing_features_with_video/features/measure_your_body_parts/description",
    icon: RulerDimensionLineIcon,
  },
  {
    name: "marketing_features_with_video/features/know_when_your_muscles_are_sufficiently_rested/name",
    description:
      "marketing_features_with_video/features/know_when_your_muscles_are_sufficiently_rested/description",
    icon: BedIcon,
  },
  {
    name: "marketing_features_with_video/features/import_and_export_your_data/name",
    description:
      "marketing_features_with_video/features/import_and_export_your_data/description",
    icon: ServerIcon,
  },
]

export function MarketingFeaturesWithVideo() {
  const { formatMessage } = useIntl()
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl sm:text-center">
          <h2 className="text-base/7 font-semibold text-primary">
            Open Source
          </h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-balance sm:text-5xl">
            Toutes vos données centralisées
          </p>
          <p className="mt-6 text-lg/8 text-base-content/70">
            Musculatus est un projet open source, qui permet de centraliser
            toutes les données de votre musculation au même endroit.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <img
            alt="App screenshot"
            src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
            width={2432}
            height={1442}
            className="mb-[-12%] rounded-xl shadow-2xl shadow-base-300 ring-1 ring-base-300"
          />
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-base-100 pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold">
                <feature.icon
                  aria-hidden="true"
                  className="absolute left-1 top-1 size-5 text-primary"
                />
                {formatMessage({ id: feature.name })}
              </dt>
              <dd>{formatMessage({ id: feature.description })}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
