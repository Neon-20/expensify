
import {  useQueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import { toast } from 'sonner';

import {client} from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>['json'];

export const useCreateCategories = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType,Error,RequestType>
    ({
    mutationFn: async(json) => {
    const response = await client.api.categories.$post({json})
    return await response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["categories"]})
            toast.success('Categories created successfully');
    },
    onError:()=>{
        toast.error("Failed to create category")
    }
    })
    return mutation;
}

