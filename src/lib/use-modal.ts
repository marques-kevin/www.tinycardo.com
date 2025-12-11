import { ModalKeys } from "@/entities/ModalEntity"
import { addHash, removeHash } from "@/lib/utils"
import { useLocation } from "@reach/router"
import { navigate } from "gatsby"

export const useModal = (key: ModalKeys) => {
  const { hash } = useLocation()

  const keys = hash.replace("#", "").split("&")

  const key_value = keys.find((k) => k.split("=")[0] === key)
  const [hash_key, value] = key_value?.split("=") || []

  const isOpen = hash_key === key

  const onOpenChange = (params?: { source?: string; value?: string }) => {
    if (isOpen) {
      navigate(removeHash({ path: key, currentHash: hash }) as string)
    } else {
      navigate(
        addHash({
          path: key,
          currentHash: hash,
          value: params?.value,
        }) as string
      )
    }
  }

  return { isOpen, onOpenChange, value }
}
