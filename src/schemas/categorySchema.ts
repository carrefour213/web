import * as z from "zod";

export const categoryFormSchema = z.object({"name":z.string()})