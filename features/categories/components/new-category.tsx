import {
Sheet,
SheetTrigger,
SheetContent,
SheetDescription,
SheetHeader,
SheetTitle
}
from "@/components/ui/sheet"
import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useNewCategoriesSheet } from "../zustand-hooks/use-new-categories";
import { useCreateCategories } from "../react-query/use-create-categories";

const formSchema = insertCategorySchema.pick({
    name:true,
})

type FormValues = z.input<typeof formSchema>

export const NewCategorySheet = () => {  
    const {isOpen,onClose,onOpen} = useNewCategoriesSheet();
    const mutation = useCreateCategories();
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
                    New Category
                </SheetTitle>
                <SheetDescription>
                    Create a new category to track your category spend.
                </SheetDescription>
            </SheetHeader>
            <CategoryForm
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