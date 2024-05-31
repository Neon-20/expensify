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
    import { useOpenAccount } from "../zustand-hooks/use-open-account";
    import { Loader2 } from "lucide-react";
    import { useEditAccounts } from "../react-query/use-edit-account";
    import {useDeleteAccounts} from "../react-query/use-delete-account"
    import { useConfirm } from "@/hooks/use-confirm";

    const formSchema = insertAccountsSchema.pick({
        name:true,
    })
    
    type FormValues = z.input<typeof formSchema>
    
    export const EditAccountSheet = () => {  
        const {isOpen,onClose,id} = useOpenAccount();
        const accountQuery = useGetAccountById(id);
        const isLoading = accountQuery.isLoading;
        const editMutation = useEditAccounts(id);
        const deleteMutation = useDeleteAccounts(id);
        const [ConfirmDialog,confirm] = useConfirm(
            "Are you sure to delete this account?",
            "You are about to delete this account."
        );
        
        const isPending = editMutation.isPending || deleteMutation.isPending

        const defaultValues = accountQuery.data ? 
        {name:accountQuery.data.name}
        :{name:""}

        const onDelete = async() => {
            const ok = await confirm();
            if(ok){
                deleteMutation.mutate(undefined,{
                    onSuccess:() => {
                        onClose();
                    }
                })
            }
        }

        const onSubmit = (values:FormValues) => {
            editMutation.mutate(values,{
                onSuccess:()=>{
                    onClose()
                }
            });
        }

        return(
            <>
            <ConfirmDialog/>
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
                    disabled={isPending}
                    defaultValues={defaultValues}
                    onDelete={onDelete}
                    />
                )}
                </SheetContent>
            </Sheet>
            </>
        )
    }