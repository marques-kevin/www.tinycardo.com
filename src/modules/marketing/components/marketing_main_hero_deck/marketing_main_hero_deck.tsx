import { ModalKeys } from "@/entities/ModalEntity"
import { useModal } from "@/lib/use-modal"
import { CheckIcon, HelpCircleIcon, Volume2Icon, XIcon } from "lucide-react"
import { useState } from "react"

const cards: Array<{
  back: string
  front: string
}> = [
  {
    front: "나는 과일을 먹는 것을 좋아해",
    back: "J'aime manger des fruits",
  },
  {
    front: "日本語を勉強したい",
    back: "Je veux apprendre le japonais",
  },
  {
    front: "我在学中文",
    back: "I am learning Chinese",
  },
]

export const MarketingMainHeroDeck = () => {
  const { onOpenChange } = useModal(ModalKeys.ai_explainer_modal)
  const { onOpenChange: onOpenChangeTts } = useModal(ModalKeys.tts_modal)
  const [is_flipped, set_is_flipped] = useState(false)
  const [current_card, set_current_card] = useState(0)

  const on_next_card = () => {
    if (current_card >= cards.length - 1) set_current_card(0)
    else set_current_card((current_card) => current_card + 1)
  }

  return (
    <div className="relative">
      <div className="stack relative z-0 aspect-square w-full cursor-pointer select-none">
        <div
          style={{
            transformOrigin: "right bottom",
          }}
          className="border-base-300 hover:rotate-3 transition-all duration-300 card bg-base-100 flex items-center justify-center border"
          onClick={() => set_is_flipped(!is_flipped)}
        >
          <div className="absolute top-0 right-0 p-2">
            <button
              className="btn btn-ghost btn-circle"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onOpenChangeTts()
              }}
            >
              <Volume2Icon className="size-5" />
            </button>
          </div>

          <div className="absolute right-0 bottom-0 p-2">
            <button
              className="btn btn-ghost btn-circle"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onOpenChange()
              }}
            >
              <HelpCircleIcon className="size-5" />
            </button>
          </div>

          <p
            className="px-4 text-center text-4xl font-bold text-balance"
            style={{
              wordBreak: "keep-all",
            }}
          >
            {is_flipped ? cards[current_card].back : cards[current_card].front}
          </p>
        </div>

        {Array.from({ length: 3 }).map((c, i) => (
          <div key={i} className="border-base-300 card bg-base-100 border" />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-4 mt-4">
        <button
          className="btn btn-xl btn-error w-full"
          onClick={() => on_next_card()}
        >
          <XIcon className="size-5" />
        </button>
        <button
          className="btn btn-xl btn-success w-full"
          onClick={() => on_next_card()}
        >
          <CheckIcon className="size-5" />
        </button>
      </div>
    </div>
  )
}
