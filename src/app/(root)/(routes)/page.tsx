"use client"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/useStoreModal"
import { UserButton } from "@clerk/nextjs"
import { useEffect } from "react"

export default function SetupPage() {
  const { onOpen, isOpen } = useStoreModal()

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [onOpen, isOpen])

  return null
}
