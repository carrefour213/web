"use client";

import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { CartContextType, CartProps, useCart } from "@/lib/cart-context";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function ProductCard({ product }: { product?: Product | null }) {
    const { data: session, status } = useSession();
    if (!product) {
        // Handle case where product is null or undefined
        return null; // or display a placeholder or error message
    }

    const { id, color, size, name, salePrice: price } = product;
    const clientProduct = { id, color: color[0], size: size[0], name, quantity: 1 }

    const cartContext = useCart() as CartContextType;

    if (!cartContext) {
        throw new Error('useContext must be used within a CartProvider');
    }
    const { cart, setCart, addToCart, deleteFromCart, checkIsInCart } = cartContext;
    const [isInCart, setIsInCart] = useState(false);
    useEffect(() => {
        const productInCart = checkIsInCart(product.id)
        productInCart ? setIsInCart(true) : null;
    }, [product])
    return (
        <div className="product-card flex flex-col h-full">
            <Link href={`/all-products/${product.productCategorieName}/${product.id}`} className="p-3 bg-[#f5f5f5] flex justify-center items-center flex-grow min-h-[250px]">
                <img src={JSON.parse(product?.image as string)[0].url} alt={product.name} className="w-full" />
            </Link>
            {isInCart ? (
                <Button className="bg-main-red text-white text-center flex justify-center items-center gap-3 p-2 w-full rounded-sm"
                    onClick={() => {
                        deleteFromCart(clientProduct as CartProps)
                        setIsInCart(false);
                    }}>
                    <IoCartOutline className="text-xl" /> Supprimer du panier
                </Button>
            ) : (
                <>{session ? <Button
                    className="bg-black text-white text-center flex justify-center items-center gap-3 p-2 w-full rounded-sm"
                    onClick={() => {
                        addToCart(clientProduct as CartProps, 1, size[0], color[0], price);
                        setIsInCart(true);
                    }}
                >
                    <IoCartOutline className="text-xl" />Ajouter au panier
                </Button> :
                    <Link href={"/auth/login"}>
                        <Button className="bg-black text-white text-center flex justify-center items-center gap-3 p-2 w-full rounded-sm">Ajouter au panier</Button>
                    </Link>
                }

                </>
            )}
            <div className="flex flex-col gap-2 py-2">
                <span>{product.name}</span>
                <span className="text-sm text-[#8886CB]">{product.salePrice} DA</span>
            </div>
        </div>
    );
}

export default ProductCard;
