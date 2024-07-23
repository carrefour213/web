"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { OrderClientInformationSchema } from "@/schemas/OrderClientInformationSchema"
import { toast } from "sonner"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { Checkbox } from "../ui/checkbox"
import { useContext } from "react"
import { addOrder } from "@/actions/order"
import { CartContext } from "@/lib/cart-context"
import { updateUser } from "@/actions/user"
import { useRouter } from "next/navigation"
import Link from "next/link"


function CheckOutForm({ session }: { session: any }) {

    const router = useRouter()

    const cartContext = useContext(CartContext);
    if (!cartContext) return null
    const { cart, setCart } = cartContext

    const form = useForm<z.infer<typeof OrderClientInformationSchema>>({
        resolver: zodResolver(OrderClientInformationSchema),
        defaultValues: {
            name: session?.user.name || "",
            mail: session?.user.email || "",
            phone: session?.user.phoneNumber || "",
            wilaya: session?.user.wilaya || "",
            adresse: session?.user.adresse || "",
            save: true,
        },
    })

    function onSubmit(values: z.infer<typeof OrderClientInformationSchema>) {

        if (values.save) {
            updateUser(session.user.id, values.phone, values.wilaya, values.adresse)
        }

        if (cart.length > 0) {
            const orderItems = cart.map((item) => ({
                productId: item.id,
                color: item.color,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
            }));
            // Calculate total price
            let totalPrice = 0;
            orderItems.forEach((item) => {
                totalPrice += item.price * item.quantity;
            });
            addOrder(session.user.id, totalPrice, orderItems)
                .then(() => {
                    toast("Commande envoyée", {
                        className: "bg-emerald-500 text-white",
                        icon: <CheckCircledIcon className="h-4 w-4" />
                    })
                    setCart([])
                    router.push('/cart')
                })
        }

    }
    return (
        <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <div className="flex flex-col md:flex-row  gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mail"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Email </FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email Address*" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Numéro de téléphoner</FormLabel>
                                <FormControl>
                                    <Input type="phone" placeholder="" {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="wilaya"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Wilaya</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="adresse"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Adresse</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>



                <FormField
                    control={form.control}
                    name="save"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="border-primary-main-red data-[state=checked]:bg-main-red data-[state=checked]:text-white"
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Enregistrez ces informations pour un paiement plus rapide la prochaine fois
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end">
                    {cart.length > 0 ?
                        <Button type="submit" className="w-[200px] bg-main-red text-white">Soumettre</Button>
                        :
                        <Link href={'/all-products'}>
                            <Button type="button" className="w-[200px] bg-white text-black border border-border">Retour au produits</Button>
                        </Link>

                    }

                </div>
            </form>
        </Form>
    );
}

export default CheckOutForm;