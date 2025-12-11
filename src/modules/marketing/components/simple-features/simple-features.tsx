import { As } from "@/components/general/As/As"
import { MarketingSimpleFeaturesEntity } from "@/entities/PageEntity"
import clsx from "clsx"
import React from "react"

export const SimpleFeatures: React.FC<
  MarketingSimpleFeaturesEntity & { index: number }
> = (props) => {
  return (
    <div className={`md:px-8 px-4 md:my-8 my-4`}>
      <div
        className={clsx(
          `py-8 sm:py-32 md:rounded-[92px] rounded-2xl relative`,
          props.index % 5 === 0 && "bg-orange-50 ring-2 ring-orange-100",
          props.index % 5 === 1 && "bg-blue-50 ring-2 ring-blue-100",
          props.index % 5 === 2 && "bg-red-50 ring-2 ring-red-100",
          props.index % 5 === 3 && "bg-emerald-50 ring-2 ring-emerald-100",
          props.index % 5 === 4 && "bg-white"
        )}
      >
        <div
          className={clsx(
            "absolute hidden lg:block top-20 left-20 text-9xl font-bold",
            props.index % 5 === 0 && "text-orange-100",
            props.index % 5 === 1 && "text-blue-100",
            props.index % 5 === 2 && "text-red-100",
            props.index % 5 === 3 && "text-emerald-100",
            props.index % 5 === 4 && "text-slate-100"
          )}
        >
          {props.index}
        </div>

        <div className="mx-auto p-4 max-w-3xl text-slate-950">
          <div className="mx-auto lg:mx-0">
            <As
              component={props.label.component}
              className="md:text-2xl text-base mb-2 font-semibold underline tracking-tighter"
            >
              {props.label.value}
            </As>

            <As
              component={props.title.component}
              className="md:text-4xl text-2xl max-w-6xl font-semibold tracking-tighter sm:text-5xl"
            >
              {props.title.value}
            </As>
            <p className="mt-2 max-w-4xl">{props.description}</p>
          </div>
          <ul className="mt-8 md:text-lg space-y-8 list-decimal pl-5">
            {props.features.map((feature, index) => (
              <li key={feature.name}>
                <p className="font-semibold">{feature.name}</p>
                <p className="mt-1">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
