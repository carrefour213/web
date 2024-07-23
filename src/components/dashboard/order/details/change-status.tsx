"use client"
import { deleteOrder, updateStatus } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { DeleteOrderDialog } from "./delete-order-dialog";
import { useState } from "react";
import { OrderItem, Status } from "@prisma/client";
import { toast } from "sonner";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { saleProduct } from "@/actions/products";



function ChangeStatus({ id, status, items }: { id: string, status: Status, items: OrderItem[] }) {
    const [clientStatus, setClientStatus] = useState(status);
    const router = useRouter();

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setClientStatus(event.target.value as Status);
    }
    const handleSave = async () => {
        try {
            await updateStatus(id, clientStatus);
            if (clientStatus === "COMPLETED") {
                items.map(async (item) => {
                    await saleProduct(item.productId)
                })
                router.back();
            }
            toast("Order Updated", {
                className: "bg-emerald-500 text-white",
                icon: <CheckCircledIcon className="h-4 w-4" />
            })
        } catch (error) {
            console.log(error);
        }
    }
    const handelDelete = async () => {
        try {
            await deleteOrder(id);
            router.back();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <span className="flex gap-2">
            <select value={clientStatus} onChange={handleStatusChange} className="bg-[#f4f2f2] text-black py-2 px-4 flex justify-center rounded-lg">
                {Object.values(Status).map((statusOption) => (
                    <option key={statusOption} value={statusOption} className="bg-[#f4f2f2] text-black py-2 px-4 flex justify-center">
                        {statusOption}
                    </option>
                ))}
            </select>
            <Button onClick={handleSave} className="bg-[#f4f2f2] text-black">Save</Button>
            <DeleteOrderDialog onDelete={handelDelete} />
        </span>
    );
}

export default ChangeStatus;