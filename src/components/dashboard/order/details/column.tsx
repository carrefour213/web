
import { getProductsById } from "@/actions/products";
import { OrderItem, Product } from "@prisma/client";
import Link from "next/link";



const Column = async ({
    item,
}: {
    item: OrderItem,
}) => {

    const product = await getProductsById(item.productId)
    const subtotal = item.price * item.quantity

    return (
        <>
            {product && (
                <div className="w-full flex justify-between items-center border p-4">
                    <div className="w-[100px]">
                        <Link href={`/dashboard/categories/${product.productCategorieName}/${product.id}`}>
                            <img
                                src={JSON.parse(product.image as string)[0].url}
                                alt="product"
                                width={1000}
                                height={1000}
                                className="w-full"
                            />
                        </Link>
                    </div>
                    <div className="min-w-[100px] text-center">
                        {product.salePrice} DA
                    </div>
                    <div className="min-w-[100px] text-center">
                        {item.color}
                    </div>
                    <div className="min-w-[100px] text-center">
                        {item.size}
                    </div>
                    <div className="min-w-[100px] text-center">
                        {item.quantity}
                    </div>
                    <div className="min-w-[100px] text-center">
                        {subtotal} DA
                    </div>
                </div>
            )}
        </>
    );
};

export default Column;
