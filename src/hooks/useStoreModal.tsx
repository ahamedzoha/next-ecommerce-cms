import { create } from "zustand"

interface useStoreModalState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useStoreModal = create<useStoreModalState>((set) => {
  return {
    isOpen: false,
    isLoading: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setLoading: (loading) => set({ isLoading: loading }),
  }
})
