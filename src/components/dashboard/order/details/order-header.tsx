import { OrderWithUserAndItems } from "../types";
import { format } from 'date-fns';
import { SlCalender } from "react-icons/sl";
import ChangeStatus from "./change-status";


function OrderHeader({ orderDetail, children }: { orderDetail: OrderWithUserAndItems, children: React.ReactNode; }) {


    return (
        <div className="bg-white p-4 ">
            <div className="mb-4">
                <h2 className="font-semibold text-xl mb-4">Order Id : {orderDetail.id}</h2>
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <span><SlCalender /></span>
                        <span>{format(new Date(orderDetail.createdAt), 'MMMM dd, yyyy HH:mm:ss')}</span>
                    </span>
                    <ChangeStatus id={orderDetail.id} status={orderDetail.status} items={orderDetail.items}/>
                </div>
            </div>
            <div className="order-details-grid gap-4">
                {children}
            </div>
        </div>
    );
}

export default OrderHeader;