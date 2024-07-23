import { getAllOrdersWithUserInfo } from "@/actions/order"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { OrderWithUserAndItems } from "./types";

async function getData(): Promise<OrderWithUserAndItems[]> {
  const orders = await getAllOrdersWithUserInfo();
  if ('error' in orders) {
    console.error(orders.error);
    return [];
  }
  return orders;
}

export default async function OrdersTable() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
