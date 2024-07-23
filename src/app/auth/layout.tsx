import Image from "next/image";

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="w-full container flex justify-center items-center gap-10 min-h-screen-hero ">
            <div className={`hidden md:block flex-1`}>
                <Image src={'/auth.png'} alt="side Image " width={1000} height={1000}></Image>
            </div>
            <main className={`flex-1 md:px-20`}>
                {children}
            </main>
        </div>
    );
}

export default AuthLayout;