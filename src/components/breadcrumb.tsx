"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaHome } from "react-icons/fa";

const ITEMS_TO_DISPLAY = 2;

const BreadcrumbResponsive = () => {
    const pathname = usePathname();
    const pathArray = pathname.split("/").filter((path) => path);
    const [open, setOpen] = useState(false);
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (pathname === "/") return null;

    const items = [
        ...pathArray.map((path, index) => ({
            href: "/" + pathArray.slice(0, index + 1).join("/"),
            label: path,
        })),
    ];

    return (
        <div className="container py-20">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="flex">
                            <FaHome className="mr-2" /> Accueil
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {items.length > ITEMS_TO_DISPLAY ? (
                        <>
                            <BreadcrumbItem>
                                {isDesktop ? (
                                    <DropdownMenu open={open} onOpenChange={setOpen}>
                                        <DropdownMenuTrigger
                                            className="flex items-center gap-1"
                                            aria-label="Toggle menu"
                                        >
                                            <BreadcrumbEllipsis className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            {items.slice(0, -ITEMS_TO_DISPLAY + 1).map((item, index) => (
                                                <DropdownMenuItem key={index}>
                                                    <Link href={item.href}>
                                                        {item.label}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <Drawer open={open} onOpenChange={setOpen}>
                                        <DrawerTrigger aria-label="Toggle Menu">
                                            <BreadcrumbEllipsis className="h-4 w-4" />
                                        </DrawerTrigger>
                                        <DrawerContent>
                                            <DrawerHeader className="text-left">
                                                <DrawerTitle>Navigate to</DrawerTitle>
                                                <DrawerDescription>
                                                    Select a page to navigate to.
                                                </DrawerDescription>
                                            </DrawerHeader>
                                            <div className="grid gap-1 px-4">
                                                {items.slice(0, -ITEMS_TO_DISPLAY + 1).map((item, index) => (
                                                    <Link
                                                        key={index}
                                                        href={item.href}
                                                        className="py-1 text-sm"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                            <DrawerFooter className="pt-4">
                                                <DrawerClose asChild>
                                                    <Button variant="outline">Close</Button>
                                                </DrawerClose>
                                            </DrawerFooter>
                                        </DrawerContent>
                                    </Drawer>
                                )}
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </>
                    ) : null}
                    {items.slice(-ITEMS_TO_DISPLAY).map((item, index) => (
                        <BreadcrumbItem key={index}>
                            {item.href !== pathname ? (
                                <>
                                    <BreadcrumbLink
                                        asChild
                                        className="max-w-20 truncate md:max-w-none"
                                    >
                                        <Link href={item.href}>{item.label}</Link>
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                </>
                            ) : (
                                <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                                    {item.label}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default BreadcrumbResponsive;
