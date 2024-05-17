import { pgTable, text } from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod";

//This is basically the data structure/modal
export const accounts = pgTable("accounts",{
    id:text("id").primaryKey(),
    plaidId:text("plaid_Id"),
    name:text("name").notNull(),
    userId:text("user_id").notNull()
})

//creating zod-schemas from drizzle-orm schema
export const insertAccountsSchema = createInsertSchema(accounts);


