'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { CiLocationArrow1 } from "react-icons/ci"
import { toast } from "sonner"
import { messageSchema } from "@/schemas/messageSchema"
import { FormFields } from "./form-fields"



function Messageform() {
    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: ""
        },
    })

    async function onSubmit(values: z.infer<typeof messageSchema>) {
        try {
          const protocol = process.env.NEXT_PUBLIC_API_URL;
          const url = `${protocol}/api/send`;
          console.log('Fetching URL:', url);
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
      
          if (!response.ok) {
            toast.error("Failed to send message. Please try again.")
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          toast.success("Message sent successfully!")
          console.log("response of the form submitting", data);
        } catch (error) {
          toast.error("Failed to send message. Please try again.")
          console.error('Error fetching data:', error);
        }
      }

    return (
        <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className=" text-white">
                <FormFields form={form} />
                <Button className=" w-full  flex items-center gap-2 text-lg text-white bg-[#f19035]" >Envoyer Message <CiLocationArrow1 className="text-3xl" /> </Button>
            </form>
        </Form>
    );
}

export default Messageform;