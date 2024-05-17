import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
    }
    from "@/components/ui/sheet"
    import { AccountForm } from "./account-form";
    import { insertAccountsSchema } from "@/db/schema";
    import { z } from "zod";
    import { useGetAccountById } from "../react-query/use-get-account-by-id";
    import { useOpenAccount } from "../hooks/use-open-account";
    import { useCreateAccounts } from "../react-query/use-create-account";
    import { Loader2 } from "lucide-react";
    
    const formSchema = insertAccountsSchema.pick({
        name:true,
    })
    
    type FormValues = z.input<typeof formSchema>
    
    export const EditAccountSheet = () => {  
        const {isOpen,onClose,id} = useOpenAccount();
        const mutation = useCreateAccounts();
        const accountQuery = useGetAccountById(id);
        const isLoading = accountQuery.isLoading;

        const defaultValues = accountQuery.data ? 
        {name:accountQuery.data.name}
        :{name:""}
    

        const onSubmit = (values:FormValues) => {
            mutation.mutate(values,{
                onSuccess:()=>{
                    onClose()
                }
            });
        }

        return(
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Edit Account
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing account over here. 
                    </SheetDescription>
                </SheetHeader>
                {isLoading ?  (
                    <div className="absolute inset-0 items-center justify-center flex">
                    <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                    </div>
                ):(
                    <AccountForm
                    // post request maarega onSubmit
                    id={id}
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={defaultValues}
                    />
                )}
                </SheetContent>
            </Sheet>
        )
    }