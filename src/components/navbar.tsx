import { auth, signOut } from "@/auth"
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from 'next/link';
import { Button } from './ui/button';
import { UserRole } from "@prisma/client";
import { Input } from "./ui/input";
import CartIcon from "./cart-icon";
import SearchBar from "./search-bar/search-bar";

const clientLinks = [
    { link: "/", label: "Accueil" },
    { link: "/contact", label: "Contact" },
    { link: "/about", label: "À propos" },
];

const visitorLinks = [
    { link: "/", label: "Accueil" },
    { link: "/contact", label: "Contact" },
    { link: "/about", label: "À propos" },
];

async function Navbar() {
    const session = await auth()
    
    return (
        <header className="w-full fixed top-0 z-50 bg-background border-b">
            <nav className={`${session?.user.role === UserRole.ADMIN ? "" : "container"}  mx-auto py-4 px-6 flex justify-between items-center `}>
                <span className='md:hidden flex justify-center items-center'>
                    <Sheet >
                        <SheetTrigger>
                            <span className='flex justify-center items-center gap-6 '>
                                <HamburgerMenuIcon className=' text-main-blue h-[1.5rem] w-[1.5rem]' />
                            </span>
                        </SheetTrigger>
                        <SheetContent side={'top'} className=' h-3/4 overflow-hidden'>
                            <ul className="relative h-full flex flex-col justify-evenly items-center">
                                {/* <AdminLinks role={session?.user.role} isMobileScreen={true} /> */}
                                <ClientLinks role={session?.user.role} isMobileScreen={true} />
                                <VisitorLinks session={session} isMobileScreen={true} />
                                <AuthLinks session={session} isMobileScreen={true} />
                            </ul>
                        </SheetContent>
                    </Sheet>
                </span>
                <span className={`flex justify-center items-center gap-6 min-w-[226px]`}>
                    <Link href={`/`} className={``}>
                        <Image className='block text-white' src={'/logo.svg'} alt="Logo" width={150} height={20} />
                    </Link>
                </span>
                <ul className={`hidden md:flex  justify-end items-center gap-14`}>
                    {/* <AdminLinks role={session?.user.role} isMobileScreen={false} /> */}
                    <ClientLinks role={session?.user.role} isMobileScreen={false} />
                    <VisitorLinks session={session} isMobileScreen={false} />
                </ul>
                <ul className={` hidden md:flex   items-center  ${session?.user.role === UserRole.ADMIN ? "flex-1 justify-end gap-14" : "justify-end gap-6"}`}>
                    <li className={`${session?.user.role === UserRole.ADMIN ? "w-1/2" : ""} `}>
                        <SearchBar session={session} />
                    </li>

                    <AuthLinks session={session} isMobileScreen={false} />
                </ul>
            </nav>
        </header >
    )
}

export default Navbar;

// function AdminLinks({ role, isMobileScreen }: { role: UserRole | undefined, isMobileScreen: boolean }) {
//     if (role !== UserRole.ADMIN) return <></>;
//     if (isMobileScreen) return (
//         <>
//             {adminLinks.map((link) => (
//                 <li key={link.link}><Link href={link.link}><SheetClose>{link.label}</SheetClose></Link></li>
//             ))}
//         </>
//     )
//     return (
//         <>
//             {adminLinks.map((link) => (
//                 <li key={link.link}><Link href={link.link}>{link.label}</Link></li>
//             ))}
//         </>
//     )
// }


function ClientLinks({ role, isMobileScreen }: { role: UserRole | undefined, isMobileScreen: boolean }) {
    if (role !== UserRole.CLIENT) return <></>;
    if (isMobileScreen) return (
        <>
            {clientLinks.map((link) => (
                <li key={link.link}><Link href={link.link}><SheetClose>{link.label}</SheetClose></Link></li>
            ))}
        </>
    )
    return (
        <>
            {clientLinks.map((link) => (
                <li key={link.link}><Link href={link.link}>{link.label}</Link></li>
            ))}
        </>
    )
}

function VisitorLinks({ session, isMobileScreen }: { session: any, isMobileScreen: boolean }) {
    if (session?.user) return <></>;
    if (!session?.user && isMobileScreen) return (
        <>
            {visitorLinks.map((link) => (
                <li key={link.link}><Link href={link.link}><SheetClose>{link.label}</SheetClose></Link></li>
            ))}
        </>
    )
    if (!session?.user) return (
        <>
            {visitorLinks.map((link) => (
                <li key={link.link}><Link href={link.link}>{link.label}</Link></li>
            ))}
        </>
    )
}

function AuthLinks({ session, isMobileScreen }: { session: any, isMobileScreen: boolean }) {
    return (
        <>
            {session?.user ? (
                <form action={async () => {
                    "use server"

                    await signOut()
                }} className="flex flex-col md:flex-row items-center gap-6">
                    {session?.user.role === UserRole.CLIENT ?
                        (isMobileScreen ?
                            <li className="mb-10 md:mb-0">
                                <CartIcon isMobileScreen={true} />
                            </li>
                            :
                            <li className="mb-10 md:mb-0">
                                <CartIcon isMobileScreen={false} />
                            </li>
                        )
                        : null}

                    <li>
                        <Button type="submit" className={` font-semibold bg-background hover:bg-transparent text-primary border border-border`}>Déconnexion</Button>
                    </li>
                </form>) : (
                isMobileScreen ?
                    <>
                        <li className=' bg-background hover:bg-transparent text-primary border rounded-md border-border px-5 py-2 '>
                            <Link href={`/auth/login`}><SheetClose>Se connecter</SheetClose></Link>
                        </li>
                        <li className='text-white rounded-md bg-primary hover:bg-[#1565c0] px-4 py-2 '>
                            <Link href={`/auth/register`}><SheetClose>S'inscrire</SheetClose></Link>
                        </li>
                    </> :
                    <>
                        <li className=' bg-background hover:bg-transparent text-primary border rounded-md border-border px-5 py-2 '>
                            <Link href={`/auth/login`}>Se connecter</Link>
                        </li>
                        <li className='text-white rounded-md bg-primary px-4 py-2 '>
                            <Link href={`/auth/register`}>S'inscrire</Link>
                        </li>
                    </>
            )}
        </>
    )
}