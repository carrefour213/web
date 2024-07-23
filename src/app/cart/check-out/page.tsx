"use client"
import CheckOutForm from "@/components/cart/check-out-form";
import { CartContext } from "@/lib/cart-context";
import { useSession } from "next-auth/react"
import { useContext } from "react";


export default function CheckOut() {
    const { data: session, status } = useSession();
    // const cartContext = useContext(CartContext);
    // if (!cartContext) return null
    // const { cart } = cartContext

    // if (status === "loading") return <div className="container">loading</div>

    return (
        <div className="container mb-32">
            <h1 className="text-2xl md:text-4xl mb-7">Details de paiement</h1>
            <div className="flex gap-14">
                <div className="flex-1">
                    {session ? <CheckOutForm session={session} /> : null}
                </div>
                {/* <div className="flex-1">
                    {cart.map((item) => (
                        <div className="flex justify-between items-center py-4">
                            <span className="w-1/6"><img src="/images/products/gamepad-1.png" alt="" /></span>
                            <span>{item.name}</span>
                            <span>1000 DA</span>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    )
}
