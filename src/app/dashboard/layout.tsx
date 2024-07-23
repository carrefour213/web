import { auth } from "@/auth";
import Aside from "@/components/dashboard/aside";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";



 const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const session = await auth()
  if (session?.user.role === UserRole.CLIENT) {
    redirect('/')
  }
    return (
        <div className="flex h-full">
            <Aside />
            <main className="ml-[250px] min-h-screen-hero bg-[#e7e7e3] w-full p-5">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;