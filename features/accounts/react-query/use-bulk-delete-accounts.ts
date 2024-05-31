
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import { toast } from 'sonner';

import {client} from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>['json'];

export const useDeleteAccounts = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType,Error,RequestType>
    ({
    mutationFn: async(json) => {
    const response = await client.api.accounts["bulk-delete"]["$post"]({json})
    return await response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["accounts"]})
        // Todo: Also invalidate summaries
        toast.success("Account Deleted")
    },
    onError:()=>{
        toast.error("Failed to delete accounts")
    }
    })
    return mutation;
}

