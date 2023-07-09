"use client"
import { Billboard } from "@prisma/client"
import { FC, useState } from "react"
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
import ImageUpload from "../ui/image-upload"

const formSchema = z.object({
  label: z.string().min(2).max(20),
  imageUrl: z.string().url(),
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialBillboardData: Billboard | null
}

const BillboardForm: FC<BillboardFormProps> = ({ initialBillboardData }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const router = useRouter()

  const title = initialBillboardData ? "Edit Billboard" : "Create Billboard"
  const description = initialBillboardData
    ? "Edit a billboard"
    : "Add a billboard"
  const toastMessage = initialBillboardData
    ? "Billboard updated successfully!"
    : "Billboard created successfully!"
  const action = initialBillboardData ? "Save Changes" : "Create"

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialBillboardData || {
      label: "",
      imageUrl: "",
    },
  })

  const onSubmit = async (values: BillboardFormValues) => {
    setLoading(true)
    try {
      setLoading(true)
      if (initialBillboardData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          values,
        )
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, values)
      }

      toast.success(toastMessage)
      router.refresh()
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
      const response = await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`,
      )
      router.refresh()
      router.push("/")
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialBillboardData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"sm"}
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4 mr-2" />
            Remove Store
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    values={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard Label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="ml-auto" type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  )
}

export default BillboardForm
