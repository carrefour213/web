"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./data-table-column-header"
import Link from "next/link"
import { OrderWithUserAndItems } from "./types"
import { format } from "date-fns"


export const columns: ColumnDef<OrderWithUserAndItems>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "user.name",
        header: "Name",
    },
    {
        accessorKey: "user.phoneNumber",
        header: "Phone Number"
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
            const createdAt = row.getValue("createdAt") as string | number | Date
            return <span>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
        },
    },
    {
        accessorKey: "totalAmount",
        header: () => <div className="text-center">Total Amount</div>,
        cell: ({ row }) => {
            const totalAmount = parseFloat(row.getValue("totalAmount"))
            const formattedNumber = new Intl.NumberFormat("en-DZ", {
                style: "decimal",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }).format(totalAmount);

            const formatted = `${formattedNumber} DZD`;

            return <div className="text-center font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <Link href={`/dashboard/orders/${payment.id}`}>
                            <DropdownMenuItem>
                                Details
                            </DropdownMenuItem>
                        </Link>
                        {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
