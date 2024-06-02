import { db } from "@/db/drizzle";
import { transactions, insertTransactionSchema, categories,accounts } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import {Hono} from "hono"
import {zValidator} from "@hono/zod-validator"
import {createId} from "@paralleldrive/cuid2";
import {z} from "zod";
import {parse, subDays} from "date-fns";



// Chaining to enable RPC access as per:
// https://hono.dev/guides/rpc#using-rpc-with-larger-applications

//mostly "query" params used with GET endpoints to filter/paginate data.
const app = new Hono()
.get("/",
zValidator("query",z.object({
    //from and to means transaction date from and to.
    from:z.string().optional(),
    to:z.string().optional(),
    accountId:z.string().optional(),
})),
clerkMiddleware(),
async(c)=>{
    //get authenticated users
    const auth = getAuth(c);
    const {from,to,accountId} = c.req.valid("query");

    if(!auth?.userId){
        return c.json({error:"UnAuthorized"},401)
    }
    
    const defaultTo = new Date();
    //deduct 30 days if from and to are not added
    const defaultFrom = subDays(defaultTo,30);

    const startDate = from ? parse(from,`yyyy-MM-dd`,new Date()) : 
    defaultFrom;
    const endDate = to ? parse(to,`yyyy-MM-dd`,new Date()) : defaultTo;

    const data = await db.select({
        id:transactions.id,
        date:transactions.date,
        category:categories.name,
        categoryId:transactions.categoryId,
        payee:transactions.payee,
        amount:transactions.amount,
        notes:transactions.notes,
        accounts:accounts.name,
        accountId:transactions.accountId
    }).from(transactions)
    // innerjoin and leftjoin creating relations with transactions
    .innerJoin(accounts,eq(transactions.accountId,accounts.id))
    .leftJoin(categories,eq(transactions.categoryId,categories.id))
    .where(
        and(
            accountId ? eq(transactions.accountId,accountId) : undefined,
            eq(accounts.userId,auth.userId),
            gte(transactions.date,startDate),
            lte(transactions.date,endDate),
        )
    )
    .orderBy(desc(transactions.date));
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
        const auth =  getAuth(c);
        const {id} = c.req.valid("param");
        if(!id){
            return c.json({error:"Missing Field"},400)
        }
        if(!auth?.userId){
            return c.json({error:"UnAuthorized"},401)
        }
        const [data] = await db.select({
            id:transactions.id,
            date:transactions.date,
            categoryId:transactions.categoryId,
            payee:transactions.payee,
            amount:transactions.amount,
            notes:transactions.notes,
            accountId:transactions.accountId
        }).from(transactions)
        .innerJoin(accounts,eq(transactions.accountId,accounts.id))
        .where(
            and(
                eq(transactions.id,id),
                eq(accounts.userId,auth.userId)
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
// omit means add everything except the Id field
zValidator("json",insertTransactionSchema.omit({
    id:true,
})),

async(c)=>{
    const auth = getAuth(c);
    const values = c.req.valid("json");
    if(!auth?.userId){
        return c.json({error:"UnAuthorized"},401)
    }
    const [data] = await db.insert(transactions).values({
        id:createId(),
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

    const data = await db
  .delete(transactions)
  .where(
    and(
      inArray(
        transactions.id,
        db
            .select({ id: transactions.id })
            .from(transactions)
            .innerJoin(accounts, eq(transactions.accountId, accounts.id))
            .where(eq(accounts.userId, auth.userId))
        ),
        inArray(transactions.id, values.ids)
    )
)
.returning({ id: transactions.id });

    return c.json({data})
})  


.patch(
    "/:id",
    clerkMiddleware(),
    zValidator("param",z.object({
        id:z.string().optional()
    })),
    zValidator("json",
    insertTransactionSchema.pick({
            name:true,
        })
    ),
    async(c)=>{
        const auth = getAuth(c);
        const {id} = c.req.valid("param")
        const values = c.req.valid("json")
        if(!id){
            return c.json({error:"Missing Id"},400)
        }
        if(!auth?.userId){
            return c.json({error:"UnAuthorized"},401)
        }
        const [data] = await db.update(categories)
        .set(values)
        .where(
            and(
                eq(categories.userId,auth.userId),
                eq(categories.id,id)
            )
        ).returning()
        if(!data){
            return c.json({error:"Not Found"},404)
        }
        return c.json({data});
    }
    
)
.delete(
    "/:id",
    clerkMiddleware(),
    zValidator("param",z.object({
        id:z.string().optional()
    })),
    async(c)=> {
        const auth = getAuth(c);
        const {id} = c.req.valid("param");
        if(!id){
            return c.json({error:"Missing Id"},400)
        }
        if(!auth?.userId){
            return c.json({error:"UnAuthorized"},401)
        }
        const [data] = await db.delete(categories)
        .where(
            and(
                eq(categories.userId,auth.userId),
                eq(categories.id,id)
            )
        ).returning({
            id:categories.id
        })
        if(!data){
            return c.json({error:"Not Found"},404)
        }
        return c.json({data})
    }
)

export default app;

