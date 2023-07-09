import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <>
          <div className="flex items-center justify-between">
            <Heading
              title={`Billboards ...`}
              description="Manage billboards of your store"
            />
            {/* Button Skeleton */}
            <Skeleton className="h-[36px] w-[126px]" />
          </div>

          <div className="">
            <div className="flex items-center py-4">
              {/* Inputfield skeleton */}
              <Skeleton className="h-[36px] w-[384px]" />
            </div>
          </div>
          <Skeleton className="h-[150px] w-full" />
          <Separator />
        </>
      </div>
    </div>
  )
}

export default Loading
