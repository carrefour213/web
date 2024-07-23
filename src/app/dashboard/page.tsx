import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import Header from "@/components/dashboard/header";
import { IoBagHandleOutline } from "react-icons/io5";
import { getTotalCancelledOrders, getTotalCompletedOrders, getTotalDeliveredOrders, getTotalOrders, getTotalProcessingOrders } from "@/actions/order";


async function Dashboard() {
  const totalOrders = await getTotalOrders() as number
  const totalProcessingOrders = await getTotalProcessingOrders() as number
  const totalDeliveredOrders = await getTotalDeliveredOrders() as number
  const totalCompletedOrders = await getTotalCompletedOrders() as number
  const totalCancelledOrders = await getTotalCancelledOrders() as number
  const orderTypes = [
    { title: "Total Orders", count: totalOrders },
    { title: "Processing Orders", count: totalProcessingOrders },
    { title: "Delivered Orders", count: totalDeliveredOrders },
    { title: "Completed Orders", count: totalCompletedOrders },
    { title: "Cancelled Orders", count: totalCancelledOrders },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Header title={"Dashboard"} />
        <div className={`dashboard-details-grid gap-4`}>
          {orderTypes.map((orderType, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className={`text-center`}>{orderType.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="bg-main-violet h-12 w-12 flex justify-center items-center rounded-lg">
                    <IoBagHandleOutline className="text-white text-3xl" />
                  </span>
                  <span className="font-semibold text-lg">{orderType.count} Orders</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Suspense>
  );
}

export default Dashboard;