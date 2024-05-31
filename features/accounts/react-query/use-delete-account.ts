
import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import { toast } from 'sonner';

import {client} from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;

export const useDeleteAccounts = (id?:string) => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType,Error>
    ({
    mutationFn: async() => {
    const response = await client.api.accounts[":id"]["$delete"]({
        param: { id }
    });
    return await response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["accounts"]})
        queryClient.invalidateQueries({queryKey:["account",{id}]})
            toast.success('Account deleted');
            // Todo: summary and transactions
    },
    onError:()=>{
        toast.error("Failed to delete account")
    }
    })
    return mutation;
}

