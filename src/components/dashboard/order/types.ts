// This type is used to define the shape of our data.

import { Prisma } from "@prisma/client";

// You can use a Zod schema here if you want.
export type OrderWithUserAndItems = Prisma.OrderGetPayload<{
    include: {
        user: {
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                phoneNumber: true,
                wilaya: true,
                adresse: true,
                role: true,
            }
        },
        items: {
            include: {
                product: true,
            },
        },
    },
}>;

export type userDetails = Prisma.UserGetPayload<{
    select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phoneNumber: true,
        wilaya: true,
        adresse: true,
        role: true,
    }
}>
