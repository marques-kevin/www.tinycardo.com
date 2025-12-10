import { ModalKeys } from "@/entities/ModalEntity"
import { useModal } from "@/lib/use-modal"
import { GlobalModal } from "@/modules/global/components/global_modal/global_modal"
import { Volume1Icon } from "lucide-react"

export const MarketingTtsModal = () => {
  const { isOpen, onOpenChange } = useModal(ModalKeys.tts_modal)

  return (
    <GlobalModal
      title="Auto generated high quality audio for your flashcards"
      description="When you add cards to your deck, we will automatically generate high-quality audio for you. This way, you can listen to them in a clear and easy way. No need to import manualluy audio anymore!"
      icon={Volume1Icon}
      is_open={isOpen}
      on_close={onOpenChange}
    />
  )
}
