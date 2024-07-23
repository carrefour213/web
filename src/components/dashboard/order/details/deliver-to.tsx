import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userDetails } from "../types";
import { CiDeliveryTruck } from "react-icons/ci";

function DeliverTo({ user }: { user: userDetails }) {
  return (
    <Card>
            <CardHeader >
                <div className="flex gap-5">
                    <span className={`w-20 h-20 flex justify-center items-center`} ><CiDeliveryTruck className="w-full text-7xl"/></span>
                    <span className="flex flex-col">
                        <h3 className="font-semibold mb-2">Deliver to</h3>
                        <p className=" text-muted-foreground mb-0.5">Wilaya : {user?.wilaya}</p>
                        <p className=" text-muted-foreground mb-0.5">Adress :{user?.adresse}</p>
                    </span>
                </div>
                <div>
                    <p></p>
                </div>
            </CardHeader>
        </Card>
  );
}

export default DeliverTo;