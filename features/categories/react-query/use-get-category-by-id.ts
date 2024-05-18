// Creating hooks to interact with the hono client and make
// it's easy to consume the api with RPC
import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";


export const useGetCategoryById = (id?:string) => {
    const query = useQuery({
        enabled:!!id,
        queryKey:["category",{id}],
        queryFn:async() => {
            const response = await client.api.categories[":id"].$get({
                param:{id}
            });
            if(!response.ok){
                throw new Error("Failed to fetch category")
            }
            const {data} = await response.json();
            return data;
        }
    })
    return query;
}