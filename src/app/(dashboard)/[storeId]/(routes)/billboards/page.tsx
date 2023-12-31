import BillboardClient from "@/components/billboards/client"
import prismadb from "@/lib/prismadb"

const BillboardsPage = async ({
  params: { storeId },
}: {
  params: { storeId: string }
}) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  )
}

export default BillboardsPage
