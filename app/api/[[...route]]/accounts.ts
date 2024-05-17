import { db } from "@/db/drizzle";
import { accounts, insertAccountsSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import {Hono} from "hono"
import {zValidator} from "@hono/zod-validator"
import {createId} from "@paralleldrive/cuid2";
import {z} from "zod";



// Chaining to enable RPC access as per:
// https://hono.dev/guides/rpc#using-rpc-with-larger-applications

const app = new Hono()
.get("/",
clerkMiddleware(),
async(c)=>{
    //get authenticated users
    const auth = getAuth(c);
    if(!auth?.userId){
        return c.json({error:"UnAuthorized"},401)
    }
    const data = await db.select({
        id:accounts.id,
        name:accounts.name
    }).from(accounts)
    .where(eq(accounts.userId,auth.userId))

    return c.json({
        data
    })
})
.get(
    "/:id",
    zValidator("param",
    z.object({
    id:z.string().optional()
    })
    ),clerkMiddleware(),
    async(c)=>{
        const auth = getAuth(c);
        const {id} = c.req.valid("param");
        if(!id){
            return c.json({error:"Missing Field"},400)
        }
        if(!auth?.userId){
            return c.json({error:"UnAuthorized"},401)
        }
        const [data] = await db.select({
            id:accounts.id,
            name:accounts.name
        }).from(accounts)
        .where(
            and(
                eq(accounts.userId,auth.userId),
                eq(accounts.id,id)
            )
        )
        if(!data){
            return c.json({error:"Not Found"},404)
        }
        return c.json({
            data
        })
    }
)
.post("/",clerkMiddleware(),
// request will contain name
zValidator("json",insertAccountsSchema.pick({
    name:true,
})),
async(c)=>{
    const auth = getAuth(c);
    const values = c.req.valid("json");
    if(!auth?.userId){
        return c.json({error:"UnAuthorized"},401)
    }
    const [data] = await db.insert(accounts).values({
        id:createId(),
        userId:auth.userId, 
        ...values
    }).returning()

    return c.json({
        data
    })
})
.post("/bulk-delete",
    clerkMiddleware(),
    zValidator("json",
    z.object({
    ids:z.array(z.string())
    })
    ),
    async(c)=> {
    const auth = getAuth(c);
    const values = c.req.valid("json");
    if(!auth?.userId){
        return c.json({error:"UnAuthorized"})
    }
    const data = await db.delete(accounts)
    .where(
        and(
            eq(accounts.userId,auth.userId),
            inArray(accounts.id,values.ids)
        )
    ).returning({
        id:accounts.id
    })
    return c.json({data})
})  

export default app;

