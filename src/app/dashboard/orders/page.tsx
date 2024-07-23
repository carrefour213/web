import Header from "@/components/dashboard/header";
import OrdersTable from "@/components/dashboard/order/orders-table";
import { Suspense } from "react";

function Orders() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header title={"Orders"} />
      <div className="bg-white rounded-md">
        <OrdersTable />
      </div>
    </Suspense>
  );
}

export default Orders;
