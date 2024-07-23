"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

import { MdOutlineDashboard } from "react-icons/md";
import { IoAlbumsOutline } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";




function Aside() {
    const pathname = usePathname();
    return (
        <aside className="fixed w-[250px] border-r min-h-screen-hero p-3 ">
            <ul className={`flex flex-col gap-4`}>
                <li className={`${pathname == "/dashboard" ? " bg-primary-foreground text-white" : "border"} flex justify-start items-center gap-4 p-2 rounded-md`}>

                    <Link href="/dashboard" className={`flex justify-start items-center gap-4 p-3`}>
                        <MdOutlineDashboard />
                        Dashboard
                    </Link>
                </li>
                <li className={`${pathname.startsWith("/dashboard/categories") ? " bg-primary-foreground text-white" : "border"} flex justify-start items-center gap-4 p-2 rounded-md`}>

                    <Link href="/dashboard/categories" className={`flex justify-start items-center gap-4 p-3`}>
                        <IoAlbumsOutline />
                        All products
                    </Link>
                </li>
                <li className={`${pathname == "/dashboard/orders" ? " bg-primary-foreground text-white" : "border"} flex justify-start items-center gap-4 p-2 rounded-md`}>

                    <Link href="/dashboard/orders" className={`flex justify-start items-center gap-4 p-3`}>
                        <IoDocumentText />
                        Order list
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Aside;