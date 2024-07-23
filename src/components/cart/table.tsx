"use client"
import Column from "@/components/cart/column";
import TableHead from "@/components/cart/table-head";
import { Button } from "@/components/ui/button";
import Total from "./total";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext, sortCartByName } from "@/lib/cart-context";

function Table() {
    const [total, setTotal] = useState<number | ((a: number) => void) | undefined>(0)
    const cartContext = useContext(CartContext);
    if (!cartContext) return null
    const { cart } = cartContext
    if (cart.length === 0) {
        return (
            <div>
                <div className="w-full flex justify-center items-center border p-4 mb-5">
                    Panier vide
                </div>
                <Link href={"/all-products"}>
                    <Button className={` bg-transparent text-black border px-10 py-6`}>
                        Retour à la boutique
                    </Button>
                </Link>
            </div>
        )
    }
    return (
        <div className={`flex flex-col gap-5`}>
            <TableHead />
            {cart.sort(sortCartByName).map((clientProduct) => (
                <Column key={clientProduct.id} clientProduct={clientProduct} setTotal={setTotal} total={total} />
            ))}

            <div className="flex justify-between items-center">
                <Link href={"/all-products"}>
                    <Button className={` bg-transparent text-black border px-10 py-6`}>
                        Retour à la boutique
                    </Button>
                </Link>

                {/* <Button className={` bg-transparent text-black border px-10 py-6`}>
                    Mettre à jour le panier
                </Button> */}
            </div>
            {typeof total === "number" ? <Total total={total} /> : <> problème </>}

        </div>
    );
}

export default Table;
