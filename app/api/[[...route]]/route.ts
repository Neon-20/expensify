import {Hono} from "hono";
import {handle} from "hono/vercel";
import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";


export const runtime = "edge";

const app = new Hono().basePath("/api");


//The below structure is used so that we can have RPC calls.
const routes = app
.route("/accounts",accounts)

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
