"use client"
import { Store } from "@prisma/client"
import { FC, useEffect, useRef, useState } from "react"
import { Trash } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"

import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import AlertModal from "../modals/alert-modal"
import ApiAlert from "@/components/ui/api-alert"
import useOrigin from "@/hooks/use-origin"

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

  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()
  // let origin = ""

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialStoreData,
  })

  const onSubmit = async (values: SettingsFormValues) => {
    setLoading(true)
    try {
      setLoading(true)
      const response = await axios.patch(
        `/api/stores/${params.storeId}`,
        values,
      )
      router.refresh()
      toast.success("Store updated successfully!")
      console.log(response.data)
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }

    console.log(values)
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      const response = await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push("/")
      toast.success("Store deleted successfully!")
      console.log(response.data)
    } catch (error) {
      toast.error("Make sure you remove all the products and categories first!")
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
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  )
}

export default SettingsForm
