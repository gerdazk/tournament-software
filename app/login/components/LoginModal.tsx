import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form
} from "@/components/ui/form"
import { TextField } from "@/src/components/Input/TextField"

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters."
    })
  })

export const  LoginModal = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        // resolver: zodResolver(formSchema),
        defaultValues: {
          // username: ""
        }
      })
     
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Log in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log in</DialogTitle>
          <DialogDescription>
            Log in to the application. If you do not have an account, create one.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextField control={form.control} label="Username" description="" placeholder="" name="name" />
        <TextField control={form.control} label="Password" description="" placeholder="" name="description" />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>
    </Form>
      </DialogContent>
    </Dialog>
  )
}
