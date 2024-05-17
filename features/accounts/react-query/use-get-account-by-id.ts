// Creating hooks to interact with the hono client and make
// it's easy to consume the api with RPC
import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";


export const useGetAccountById = (id?:string) => {
    const query = useQuery({
        enabled:!!id,
        queryKey:["account",{id}],
        queryFn:async() => {
            const response = await client.api.accounts[":id"].$get({
                param:{id}
            });
            if(!response.ok){
                throw new Error("Failed to fetch account")
            }
            const {data} = await response.json();
            return data;
        }
    })
    return query;
}