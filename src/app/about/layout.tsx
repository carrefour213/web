import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";



async function AboutLayout({
    children
}: {
    children: React.ReactNode
}) {
    const session = await auth()
    if (session?.user.role === UserRole.ADMIN) {
        redirect('/dashboard')
    }
    return (
        <>
            {children}
        </>
    );
}

export default AboutLayout;