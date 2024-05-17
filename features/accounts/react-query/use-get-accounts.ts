// Creating hooks to interact with the hono client and make
// it's easy to consume the api with RPC
import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";


export const useGetAccounts = () => {
    const query = useQuery({
        queryKey:["accounts"],
        queryFn:async() => {
            const response = await client.api.accounts.$get();
            if(!response.ok){
                throw new Error("Failed to fetch accounts")
            }
            const {data} = await response.json();
            return data;
        }
    })
    return query;
}