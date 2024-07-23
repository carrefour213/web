import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userDetails } from "../types";



function UserDetails({ user }: { user: userDetails }) {
    return (
        <Card>
            <CardHeader >
                <div className="flex gap-5">
                    <span className={`w-20 h-20 bg-cover`} style={{ backgroundImage: `url(${user?.image})` }}></span>
                    <span className="flex flex-col">
                        <h3 className="font-semibold mb-2">Customer</h3>
                        <p className=" text-muted-foreground mb-0.5">Full Name : {user?.name}</p>
                        <p className=" text-muted-foreground mb-0.5">Email :{user?.email}</p>
                        <p className=" text-muted-foreground mb-0.5">Phone :{user?.phoneNumber}</p>
                    </span>
                </div>
                <div>
                    <p></p>
                </div>
            </CardHeader>
        </Card>
    );
}

export default UserDetails;