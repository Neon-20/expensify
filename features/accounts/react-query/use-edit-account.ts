
import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import { toast } from 'sonner';

import {client} from "@/lib/hono";
import { useOpenAccount } from '../zustand-hooks/use-open-account';

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>['json'];

export const useEditAccounts = (id?:string) => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType,Error,RequestType>
    ({
    mutationFn: async(json) => {
    const response = await client.api.accounts[":id"]["$patch"]({ 
        json,
        param:{ id }
    });
    return await response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["accounts"]})
        queryClient.invalidateQueries({queryKey:["account",{id}]})
            toast.success('Account updated');
            // Todo: summary and transactions
    },
    onError:()=>{
        toast.error("Failed to edit account")
    }
    })
    return mutation;
}

