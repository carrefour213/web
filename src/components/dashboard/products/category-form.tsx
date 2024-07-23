"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { categoryFormSchema } from "@/schemas/categorySchema"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { addCategory } from "@/actions/categories"


export default function CategoryForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof categoryFormSchema>>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: z.infer<typeof categoryFormSchema>) {
        console.log(values)
        setError("");
        setSuccess("");
        startTransition(() => {
            addCategory(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                    if (data?.success) {
                        form.reset();
                    }
                });
        });
    }

    const onCancel = () => {
        router.back();
    };

    return (
        <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Category name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </div>
                <div className="flex justify-end gap-4 mt-10">
                    <Button disabled={isPending} type="submit" className="w-28 bg-[#232321] text-white">
                        Add
                    </Button>
                    <Button disabled={isPending} onClick={onCancel} type="button" className="w-28 bg-white border text-black">
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    )
}
