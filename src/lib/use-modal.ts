import { ModalKeys } from "@/entities/ModalEntity"
import { useLocation } from "@reach/router"

export const useModal = (key: ModalKeys) => {
  const { hash } = useLocation()

  const keys = hash.replace("#", "").split("&")

  const key_value = keys.find((k) => k.split("=")[0] === key)
  const [hash_key, value] = key_value?.split("=") || []

  const isOpen = hash_key === key

  const onOpenChange = (params?: { source?: string; value?: string }) => {
    if (isOpen) {
    } else {
      const source_to_use =
        typeof params?.source === "string" ? params.source : undefined
      const value_to_use =
        typeof params?.value === "string" ? params.value : undefined
    }
  }

  return { isOpen, onOpenChange, value }
}
