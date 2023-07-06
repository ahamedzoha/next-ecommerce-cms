"use client"
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FC, useState } from "react"
import { PopoverTriggerProps } from "@radix-ui/react-popover"
import { Store } from "@prisma/client"
import { useStoreModal } from "@/hooks/useStoreModal"
import { useParams, useRouter } from "next/navigation"

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[]
}

const StoreSwitcher: FC<StoreSwitcherProps> = ({ className, items = [] }) => {
  const [open, setOpen] = useState(false)

  const params = useParams()
  const router = useRouter()
  const storeModal = useStoreModal()

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId,
  )

  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 w-4 h-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search stores..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup>
            {formattedItems.map((store) => (
              <CommandItem
                key={store.value}
                onSelect={() => {
                  onStoreSelect(store)
                }}
              >
                <StoreIcon className="mr-2 w-4 h-4" />
                {store.label}
                <Check
                  className={cn(
                    "ml-auto w-4 h-4",
                    currentStore?.value === store.value
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.onOpen()
                }}
                className="cursor-pointer"
              >
                <PlusCircle className="mr-2 w-5 h-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher
