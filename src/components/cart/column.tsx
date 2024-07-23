"use client";

import { getProductsById } from "@/actions/products";
import { CartContextType, CartProps, useCart } from "@/lib/cart-context";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

// Function to fetch product details by ID
const fetchProductDetails = async (
    productId: string,
    setProduct: (product: Product | null) => void,
    setSubtotal: (subtotal: number | undefined) => void,
    quantity: number,
    setTotal: (total: number | ((a: number) => void) | undefined) => void,
    total: number | ((a: number) => void) | undefined
) => {
    try {
        const fetchedProduct = await getProductsById(productId);
        setProduct(fetchedProduct);
        if (quantity && fetchedProduct?.salePrice) {
            setSubtotal(fetchedProduct.salePrice * quantity);
            if (typeof total === "number") setTotal(total => total + fetchedProduct.salePrice * quantity);
        }
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }
};

const Column = ({
    clientProduct,
    setTotal,
    total
}: {
    clientProduct: CartProps,
    setTotal: (subtotal: number | ((a: number) => void) | undefined) => void,
    total: number | ((a: number) => void) | undefined,
}) => {
    const [quantity, setQuantity] = useState(clientProduct.quantity);
    const [product, setProduct] = useState<Product | null>(null);
    const [subtotal, setSubtotal] = useState<number | undefined>(0);
    const { updateCartQuntity, deleteFromCart } = useCart() as CartContextType;

    useEffect(() => {
        if (clientProduct && quantity) {
            fetchProductDetails(clientProduct.id, setProduct, setSubtotal, quantity, setTotal, total);
        }
    }, [clientProduct.id]);

    const handleQuantityChange = (action: "increase" | "decrease") => {
        if (product && clientProduct && clientProduct.quantity && quantity) {
            const newQuantity = action === "increase" ? quantity + 1 : quantity - 1;

            if (newQuantity > 0) {
                if (action === "increase") {
                    if (typeof total === "number") setTotal(total + product.salePrice);
                } else if (action === "decrease") {
                    if (typeof total === "number") setTotal(total - product.salePrice);
                }
                setQuantity(newQuantity);
                setSubtotal(product.salePrice * newQuantity);
                updateCartQuntity(clientProduct, newQuantity);
            }
        }
    };

    return (
        <>
            {product && (
                <div className="w-full flex justify-between items-center border p-4">
                    <div className="w-16 md:w-[100px]">
                        <Link href={`/all-products/gaming/${product.id}`} className="w-full">
                            <img
                                src={JSON.parse(product.image as string)[0].url}
                                alt="product"
                                width={1000}
                                height={1000}
                                className="w-full"
                            />
                        </Link>
                    </div>
                    <div className="min-w-[100px] text-center hidden md:block">
                        {product.salePrice} DA
                    </div>
                    <div className="min-w-[100px] text-center hidden md:block">
                        {clientProduct.color}
                    </div>
                    <div className="min-w-[100px] text-center hidden md:block">
                        {clientProduct.size}
                    </div>
                    <div className="hidden md:flex items-center gap-2 border w-fit rounded-sm text-center  ">
                        <button
                            className="border-r p-2 w-[40px] rounded-tl-sm rounded-bl-sm"
                            onClick={() => handleQuantityChange("decrease")}
                        >
                            -
                        </button>
                        <div className="w-[50px] text-center">{quantity}</div>
                        <button
                            className="bg-[#D0892F] p-2 w-[40px] rounded-tr-sm rounded-br-sm text-white"
                            onClick={() => handleQuantityChange("increase")}
                        >
                            +
                        </button>
                    </div>
                    <div className="min-w-[100px] text-center">
                        {subtotal} DA
                    </div>
                    <div className="min-w-[100px] text-center flex justify-center">
                        <FaTrashAlt className="text-main-red" onClick={() => { (typeof total === "number") ? setTotal(total - product.salePrice * quantity) : null; deleteFromCart(clientProduct); }} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Column;
