
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from 'sonner';

import {client} from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?:string) => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType,Error>
    ({
    mutationFn: async() => {
    const response = await client.api.categories[":id"]["$delete"]({
        param: { id }
    });
    return await response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["categories"]})
        queryClient.invalidateQueries({queryKey:["category",{id}]})
            toast.success('Category deleted');
            // Todo: summary and transactions
    },
    onError:()=>{
        toast.error("Failed to delete category")
    }
    })
    return mutation;
}

