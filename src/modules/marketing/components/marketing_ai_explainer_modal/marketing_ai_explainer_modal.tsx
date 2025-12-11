import { ModalKeys } from "@/entities/ModalEntity"
import { useModal } from "@/lib/use-modal"
import { GlobalModal } from "@/modules/global/components/global_modal/global_modal"
import { HelpCircleIcon } from "lucide-react"
import { useIntl } from "react-intl"

export const MarketingAIExplainerModal = () => {
  const { isOpen, onOpenChange } = useModal(ModalKeys.ai_explainer_modal)
  const { formatMessage } = useIntl()

  return (
    <GlobalModal
      title={formatMessage({ id: "marketing_ai_explainer_modal/title" })}
      description={formatMessage({
        id: "marketing_ai_explainer_modal/description",
      })}
      icon={HelpCircleIcon}
      is_open={isOpen}
      on_close={onOpenChange}
    />
  )
}
