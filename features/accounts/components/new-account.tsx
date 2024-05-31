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
import { useNewAccountSheet } from "../zustand-hooks/use-new-account";
import { useCreateAccounts } from "../react-query/use-create-account";

const formSchema = insertAccountsSchema.pick({
    name:true,
})

type FormValues = z.input<typeof formSchema>

export const NewAccountSheet = () => {  
    const {isOpen,onClose,onOpen} = useNewAccountSheet();
    const mutation = useCreateAccounts();
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
                    New Account
                </SheetTitle>
                <SheetDescription>
                    Create a new account to track your accounts.
                </SheetDescription>
            </SheetHeader>
            <AccountForm
            // post request maarega onSubmit
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={{
                name:""
            }}
            />
            </SheetContent>
        </Sheet>
    )
}