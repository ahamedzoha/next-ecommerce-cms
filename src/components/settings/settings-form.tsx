"use client"
import { Store } from "@prisma/client"
import { FC, useState } from "react"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface SettingsFormProps {
  initialStoreData: Store
}

const formSchema = z.object({
  name: z.string().min(2).max(20),
})

type SettingsFormValues = z.infer<typeof formSchema>

const SettingsForm: FC<SettingsFormProps> = ({ initialStoreData }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialStoreData,
  })

  const onSubmit = async (values: SettingsFormValues) => {
    setLoading(true)
    try {
    } catch (error) {
    } finally {
      setLoading(false)
    }

    console.log(values)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          disabled={loading}
          variant={"destructive"}
          size={"sm"}
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4 mr-2" />
          Remove Store
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Store Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="ml-auto" type="submit" disabled={loading}>
            Save
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SettingsForm
