"use client"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/phone-input"
import { Textarea } from "@/components/ui/textarea";

export function FormFields({ form }: { form: any }) {
    return (
        <section className="flex flex-col gap-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-6 mb-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col items-start w-full">
                            <FormControl className="text-black">
                                <Input placeholder={"Votre Nom *"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col items-start w-full">
                            <FormControl className="text-black w-full">
                                <Input type="text" placeholder={"Votre Email *"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col items-start w-full ">
                            <FormControl className="w-full text-black">
                                <PhoneInput defaultCountry="DZ" placeholder={"Votre Numero de tel *"} className="text-black " {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>

            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col items-start w-full mb-6 min-h-[145px]">
                        <FormControl className="text-black w-full h-[145px]">
                            <Textarea placeholder={"Votre Massage"} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </section>
    );
}