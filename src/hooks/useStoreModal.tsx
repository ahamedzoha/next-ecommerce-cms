import { create } from "zustand"

interface useStoreModalState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useStoreModal = create<useStoreModalState>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }
})
