import { getOrdersByUserId } from "@/actions/order";
import { auth } from "@/auth";
import Table from "@/components/cart/table";
import SectionTitle from "@/components/section-title";
import { format } from 'date-fns';



async function Cart() {
    const session = await auth();
    const userId = session?.user?.id;
    let orders = [];
    if (userId) {
        orders = await getOrdersByUserId(userId) as any;
    }

    return (
        <div className="container mb-20">
            <Table />
            {
                orders.length > 0 ?
                    <>
                        <div className="mb-10"></div>
                        <SectionTitle title={"Mes comaandes"} color={"red"} />
                        <div className="mb-10"></div>
                        <Orders orders={orders} />
                    </>
                    :
                    null
            }
        </div>
    );
}

const Orders = ({ orders }: { orders: any }) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex border border-border p-2">
                <span className="flex-1 text-center">la date de la commande</span>
                <span className="flex-1 text-center">Totale</span>
                <span className="flex-1 text-center">statue</span>
            </div>
            {orders.map((order: any) => {
                return (
                    <div key={order.id} className="flex border border-border p-2">
                        <div className="flex-1 text-center">{format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm:ss')}</div>
                        <div className="flex-1 text-center">{order.totalAmount} DA</div>
                        <div className="flex-1 text-center">{order.status}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Cart;