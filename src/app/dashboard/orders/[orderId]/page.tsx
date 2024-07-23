import { getOrderDetailsWithUserAndItems } from "@/actions/order";
import Header from "@/components/dashboard/header";
import DeliverTo from "@/components/dashboard/order/details/deliver-to";
import OrderHeader from "@/components/dashboard/order/details/order-header";
import Products from "@/components/dashboard/order/details/products";
import UserDetails from "@/components/dashboard/order/details/user-details";
import { OrderWithUserAndItems } from "@/components/dashboard/order/types";
import { Suspense } from "react";



async function OrderDetails({ params }: { params: { orderId: string } }) {
    const orderId = params.orderId
    const orderDetail = await getOrderDetailsWithUserAndItems(orderId) as OrderWithUserAndItems | undefined
    return (
        <Suspense>
            <Header title={"Order Details"} />
            {
                orderDetail &&
                <>
                    <OrderHeader orderDetail={orderDetail}>
                        <UserDetails user={orderDetail.user} />
                        <DeliverTo user={orderDetail.user} />
                    </OrderHeader>
                    <Products items={orderDetail.items} />
                </>
            }
        </Suspense>
    );
}

export default OrderDetails;