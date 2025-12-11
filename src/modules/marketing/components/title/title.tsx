import { As } from "@/components/general/As/As"
import { MarketingTitleEntity } from "@/entities/PageEntity"
import React from "react"

export const Title: React.FC<MarketingTitleEntity> = (props) => {
  return (
    <div className="mx-auto flex max-w-3xl mb-4 px-4">
      <As
        component={props.title.component}
        className="text-3xl md:text-5xl font-semibold leading-tight tracking-tighter "
      >
        {props.title.value}
      </As>
    </div>
  )
}
