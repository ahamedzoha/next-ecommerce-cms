"use client"

import { Row } from "@tanstack/react-table"
import { FC, useState } from "react"
import { toast } from "react-hot-toast"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"

import { BillboardColumn } from "@/components/billboards/columns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import AlertModal from "@/components/modals/alert-modal"

interface CellActionProps {
  row: Row<BillboardColumn>
}
const CellAction: FC<CellActionProps> = ({ row }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams()

  const onCopy = () => {
    navigator.clipboard.writeText(row.original.id)
    toast.success(`Copied ${row.original.label} billboard's ID to clipboard!`)
  }

  const onEdit = () => {
    router.push(`/${params.storeId}/billboards/${row.original.id}`)
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/billboards/${row.original.id}`)
      router.refresh()
      toast.success("Billboard deleted successfully!")
    } catch (error) {
      toast.error(
        "Make sure you remove all the categories using this Billboard",
      )
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="w-4 h-4 mr-2" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
