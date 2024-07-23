"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoCartOutline } from "react-icons/io5";
import { getProductsById } from "@/actions/products";
import { Product, Size } from "@prisma/client";
import { ImageProps } from "@/lib/edgestore";
import { CartContextType, CartProps, useCart } from "@/lib/cart-context";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Fetch product details by ID
const fetchProductDetails = async (
    productId: string, setProduct: (product: Product | null) => void,
    setClientProduct: (clientProduct: CartProps | undefined) => void,
    checkIsInCart: (productId: string) => CartProps | undefined,
    setIsInCart: (isInCart: boolean) => void,
    setQuantity: (quantity: number) => void,
    setSelectedSize: (size: Size) => void,
    selectedColor: (color: string) => void
) => {
    try {
        const fetchedProduct = await getProductsById(productId);
        setProduct(fetchedProduct);

        const productInCart = checkIsInCart(productId);
        if (productInCart) {
            setClientProduct(productInCart);
            setIsInCart(true);
            setQuantity(productInCart.quantity);
            setSelectedSize(productInCart.size);
            selectedColor(productInCart.color);
        } else {
            if (fetchedProduct) {
                setClientProduct({ id: fetchedProduct.id, name: fetchedProduct.name, quantity: 1, size: fetchedProduct.size[0], color: fetchedProduct.color[0], price: fetchedProduct.salePrice });
                setSelectedSize(fetchedProduct.size[0]);
                selectedColor(fetchedProduct.color[0])
            }
        }
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }
};

// Handle quantity changes
const handleQuantityChange = (action: "increase" | "decrease", product: Product | null, clientProduct: CartProps | undefined, quantity: number, setQuantity: (quantity: number) => void, updateCart: (clientProduct: CartProps, quantity: number) => void) => {
    if (product && clientProduct && quantity) {
        const newQuantity = action === "increase" ? quantity + 1 : quantity - 1;
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            updateCart(clientProduct, newQuantity);
        }
    }
};

function ProductDetails({ productId }: { productId: string }) {
    const { data: session, status } = useSession();
    const { cart, addToCart, updateCartQuntity, deleteFromCart, checkIsInCart, updateCart } = useCart() as CartContextType;
    const [product, setProduct] = useState<Product | null>(null);
    const [clientProduct, setClientProduct] = useState<CartProps | undefined>(undefined);
    const [isInCart, setIsInCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<Size>("S");
    const [selectedColor, setSelectedColor] = useState<string>("");

    useEffect(() => {
        fetchProductDetails(productId, setProduct, setClientProduct, checkIsInCart, setIsInCart, setQuantity, setSelectedSize, setSelectedColor);
    }, [productId]);

    const handleSizeChange = (event: any) => {
        if (clientProduct) {
            setSelectedSize(event.target.value);
            // updateCart(clientProduct, quantity, event.target.value, selectedColor)
            if (isInCart) updateCart(clientProduct, quantity, event.target.value, selectedColor)
        }
    }
    const handleColorChange = (event: any) => {
        if (clientProduct) {
            setSelectedColor(event.target.value);

            if (isInCart) updateCart(clientProduct, quantity, selectedSize, event.target.value)
        }
    }

    return (
        <div className=" mb-20">
            {product && (
                <main className="flex flex-col md:flex-row gap-10 mb-20">
                    <div className="w-[120px] hidden md:flex flex-col gap-7">
                        {JSON.parse(product.image as string).map((image: ImageProps, i: number) => (
                            i !== 0 && (
                                <div className="bg-[#f5f5f5] p-4 border-2" key={image.url}>
                                    <img
                                        src={image.url}
                                        alt="product"
                                        width={1000}
                                        height={1000}
                                        className="w-full"
                                    />
                                </div>
                            )
                        ))}
                    </div>
                    <div className="md:w-[40%] bg-[#f5f5f5] flex justify-center items-center p-6">
                        <img
                            src={JSON.parse(product.image as string)[0].url}
                            alt="product"
                            width={1000}
                            height={1000}
                            className="w-full"
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-4 md:ml-10">
                        <h1 className="font-bold text-2xl tracking-wide">{product.name}</h1>
                        <span className="font-semibold tracking-wider text-xl">{product.salePrice} DA</span>
                        <p className="mb-2">{product.description}</p>
                        <div className="h-0.5 w-full bg-gray-300"></div>
                        <div className="flex flex-col gap-7 mt-4">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <span>Taille:</span>
                                    <span className="flex items-center gap-5">
                                        {product.size.map(size => (
                                            <label key={size} className="flex items-center gap-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    value={size}
                                                    checked={selectedSize === size}
                                                    onChange={handleSizeChange}
                                                />
                                                <span className="custom-radio"></span>
                                                {size.charAt(0).toUpperCase() + size.slice(1)}
                                            </label>
                                        ))}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span>Couleurs:</span>
                                    <span className="flex items-center gap-5">
                                        {product.color.map(color => (
                                            <label key={color} className="flex items-center gap-1 ">
                                                <input
                                                    type="radio"
                                                    value={color}
                                                    checked={selectedColor === color}
                                                    onChange={handleColorChange}
                                                />
                                                {color.charAt(0).toUpperCase() + color.slice(1)}
                                            </label>
                                        ))}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-5">
                                <div className="flex items-center gap-2 border w-fit rounded-sm">
                                    <button
                                        className="border-r p-2 w-[40px] rounded-tl-sm rounded-bl-sm"
                                        onClick={() => handleQuantityChange("decrease", product, clientProduct, quantity, setQuantity, updateCartQuntity)}
                                    >
                                        -
                                    </button>
                                    <div className="w-[50px] text-center">{quantity}</div>
                                    <button
                                        className="bg-[#D0892F] p-2 w-[40px] rounded-tr-sm rounded-br-sm text-white"
                                        onClick={() => handleQuantityChange("increase", product, clientProduct, quantity, setQuantity, updateCartQuntity)}
                                    >
                                        +
                                    </button>
                                </div>
                                {isInCart ? (
                                    <Button className="bg-main-red text-white text-center flex justify-center items-center gap-3 p-2 w-full rounded-sm"
                                        onClick={() => {
                                            deleteFromCart(clientProduct as CartProps)
                                            setIsInCart(false);
                                        }}>
                                        <IoCartOutline className="text-xl" /> Supprimer du panier
                                    </Button>
                                ) : (
                                    <>
                                        {session ?
                                            <Button
                                                className="bg-black text-white text-center flex justify-center items-center gap-3 p-2 w-full rounded-sm"
                                                onClick={() => {
                                                    addToCart(clientProduct as CartProps, quantity, selectedSize, selectedColor, product.salePrice);
                                                    setIsInCart(true);
                                                }}
                                            >
                                                <IoCartOutline className="text-xl" /> Ajouter au panier
                                            </Button> :
                                            <Link href={"/auth/login"} className="w-full">
                                                <Button className="bg-black text-white text-center flex justify-center items-center gap-3 p-2 w-full rounded-sm">Ajouter au panier</Button>
                                            </Link>}
                                    </>
                                )}
                            </div>
                            {cart.length > 0 ?
                                <Link href={"/cart/check-out"} className="w-full">
                                    <Button className="bg-[#05413f] text-white w-full">
                                        Check Out
                                    </Button>
                                </Link>
                                : <></>}


                        </div>
                    </div>
                </main>
            )}
        </div>
    );
}

export default ProductDetails;
