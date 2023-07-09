"use client"
import { ColumnDef } from "@tanstack/react-table"
import format from "date-fns/format"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type BillboardColumn = {
  id: string
  label: string
  createdAt: Date
}

const Columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          className="ml-0 pl-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    accessorFn: (data) => {
      return format(data.createdAt, "MMMM do, yyyy")
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <CellAction row={row} />
    },
  },
]
export default Columns
