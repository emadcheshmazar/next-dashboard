import { useSyncExternalStore } from "react"
import AppReduxStore from "@/app/shared/redux/store"
import { getModal } from "@/app/shared/core"

export const useModalState = ({ name }: { name: string }) => {
  return useSyncExternalStore(
    AppReduxStore.subscribe,
    () => getModal({ modalName: name }),
    () => getModal({ modalName: name }),
  )
}
