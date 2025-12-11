import { ModalKeys } from "@/entities/ModalEntity"
import { useModal } from "@/lib/use-modal"
import { GlobalModal } from "@/modules/global/components/global_modal/global_modal"
import { Volume1Icon } from "lucide-react"
import { useIntl } from "react-intl"

export const MarketingTtsModal = () => {
  const { isOpen, onOpenChange } = useModal(ModalKeys.tts_modal)
  const { formatMessage } = useIntl()

  return (
    <GlobalModal
      title={formatMessage({ id: "marketing_tts_modal/title" })}
      description={formatMessage({ id: "marketing_tts_modal/description" })}
      icon={Volume1Icon}
      is_open={isOpen}
      on_close={onOpenChange}
    />
  )
}
