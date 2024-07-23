import { OrderItem } from "@prisma/client";
import TableHead from "./table-head";
import Column from "./column";



function Products({ items }: { items: OrderItem[] }) {
    // console.log(items);
    return (
        <div className="bg-white mt-4 p-4 rounded-lg">
            <h3 className="font-semibold text-xl mb-4">Products</h3>
            <div className="flex flex-col gap-5">
                <TableHead />
                {items?.map((item) => (
                    <Column item={item} />
                ))}
            </div>
        </div>
    );
}

export default Products;