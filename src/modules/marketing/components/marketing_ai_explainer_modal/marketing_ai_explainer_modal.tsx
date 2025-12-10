import { ModalKeys } from "@/entities/ModalEntity"
import { useModal } from "@/lib/use-modal"
import { GlobalModal } from "@/modules/global/components/global_modal/global_modal"
import { HelpCircleIcon } from "lucide-react"

export const MarketingAIExplainerModal = () => {
  const { isOpen, onOpenChange } = useModal(ModalKeys.ai_explainer_modal)

  return (
    <GlobalModal
      title="AI will help you understand the card"
      description="If a flashcard is too difficult to understand, don’t worry! You can tap the helper button to call on Tinycardo's AI assistant. It'll will explain the card to you in a clear and simple way — so you can keep learning with confidence!"
      icon={HelpCircleIcon}
      is_open={isOpen}
      on_close={onOpenChange}
    />
  )
}
