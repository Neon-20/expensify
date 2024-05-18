
import {  useQueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import { toast } from 'sonner';

import {client} from "@/lib/hono";
import { useOpenCategory } from '../zustand-hooks/use-open-categories';

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>['json'];

export const useEditCategories = (id?:string) => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType,Error,RequestType>
    ({
    mutationFn: async(json) => {
    const response = await client.api.categories[":id"]["$patch"]({ 
        json,
        param:{ id }
    });
    return await response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["categories"]})
        queryClient.invalidateQueries({queryKey:["category",{id}]})
            toast.success('Category updated');
            // Todo: summary and transactions
    },
    onError:()=>{
        toast.error("Failed to edit category.")
    }
    })
    return mutation;
}

