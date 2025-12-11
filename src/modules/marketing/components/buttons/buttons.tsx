import React from "react"

import { MarketingButtonsEntity } from "@/entities/PageEntity"
import clsx from "clsx"

const buttonSizes = {
  sm: "sm" as const,
  md: "default" as const,
  lg: "lg" as const,
}

export const MarketingButtons: React.FC<MarketingButtonsEntity> = (props) => {
  return (
    <div className="flex justify-center items-center flex-col md:flex-row gap-4">
      {props.buttons.map((button) => {
        if (button.type === "authentication") {
          return (
            <button
              key={button.label}
              className={clsx("btn", buttonSizes[button.size])}
            >
              {button.label}
            </button>
          )
        }

        return (
          <a key={button.label} href={button.url || "#"}>
            <button className={clsx("btn", buttonSizes[button.size])}>
              {button.label}
            </button>
          </a>
        )
      })}
    </div>
  )
}
