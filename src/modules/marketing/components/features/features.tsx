import { As } from "@/components/general/As/As"
import { Video } from "@/components/general/Video/Video"
import type { MarketingFeaturesEntity } from "@/entities/PageEntity"
import classNames from "classnames"
import React from "react"

export const Features: React.FC<
  MarketingFeaturesEntity & { invert?: boolean }
> = (props) => {
  const [selected, setSelected] = React.useState(0)

  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="px-6 md:px-0 lg:pr-4">
          <As
            component={props.label.component}
            className="text-xl font-semibold tracking-tight inline-block"
          >
            {props.label.value}
          </As>

          <As
            component={props.title.component}
            className="text-2xl mt-2 font-semibold tracking-tight sm:text-5xl"
          >
            {props.title.value}
          </As>

          <As
            component={"p"}
            className="mt-4 lg:max-w-3xl text-xl tracking-tight"
          >
            {props.description}
          </As>
        </div>

        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2 lg:items-start mt-8">
          <div className={classNames(props.invert && "order-last")}>
            <dl className="mx-auto mt-6 max-w-2xl  text-base lg:mx-0 lg:max-w-lg">
              {props.features?.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => setSelected(index)}
                  className={classNames(
                    index === selected
                      ? "block bg-primary/10"
                      : "hover:bg-primary/10",
                    "relative my-2 flex cursor-pointer items-start justify-center rounded-lg border border-transparent p-4 transition-all duration-300 ease-in-out"
                  )}
                  role="tab"
                  aria-selected={index === selected}
                  aria-controls={`feature-panel-${index}`}
                  id={`feature-tab-${index}`}
                >
                  <span
                    className="mr-3 font-semibold text-primary-content"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <div>
                    <dt className="flex items-center  font-semibold">
                      <h3 aria-labelledby={`feature-title-${index}`}>
                        {feature.title.value}
                      </h3>
                    </dt>
                    <dd
                      id={`feature-desc-${index}`}
                      aria-describedby={`feature-title-${index}`}
                      className="inline"
                    >
                      {feature.description}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="mx-auto flex h-full items-start px-2 lg:mx-0 lg:w-full lg:pt-6"
            role="tabpanel"
            id={`feature-panel-${selected}`}
            aria-labelledby={`feature-tab-${selected}`}
          >
            {props.features
              ?.filter((_, index) => index === selected)
              .map((feature) => (
                <Video
                  key={feature.video.src?.publicURL}
                  src={feature.video.src?.publicURL}
                  illustration={feature.video.illustration}
                  alt={feature.video?.alt || ""}
                  autoplay
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
