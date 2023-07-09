"use client"

import { Plus } from "lucide-react"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter } from "next/navigation"
import { Billboard } from "@prisma/client"
import { FC } from "react"
import { DataTable } from "../ui/data-table"
import Columns from "./columns"

interface BillboardClientProps {
  data: Billboard[]
}
const BillboardClient: FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards of your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>

      <DataTable searchKey="label" columns={Columns} data={data} />

      <Separator />
    </>
  )
}

export default BillboardClient
