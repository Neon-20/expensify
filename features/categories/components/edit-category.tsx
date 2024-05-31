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
    import { useGetCategoryById } from "../react-query/use-get-category-by-id";
    import { useOpenCategory } from "../zustand-hooks/use-open-categories";
    import { Loader2 } from "lucide-react";
    import { useEditCategories } from "../react-query/use-edit-category";
    import {useDeleteCategory} from "../react-query/use-delete-category"
    import { useConfirm } from "@/hooks/use-confirm";

    const formSchema = insertCategorySchema.pick({
        name:true,
    })
    
    type FormValues = z.input<typeof formSchema>
    
    export const EditCategorySheet = () => {  
        const {isOpen,onClose,id} = useOpenCategory();
        const categoryQuery = useGetCategoryById(id);
        const isLoading = categoryQuery.isLoading;
        const editMutation = useEditCategories(id);
        const deleteMutation = useDeleteCategory(id);

        const [ConfirmDialog,confirm] = useConfirm(
            "Are you sure to delete this category?",
            "You are about to delete this category."
        );
        
        const isPending = editMutation.isPending || deleteMutation.isPending

        const defaultValues = categoryQuery.data ? 
        {name:categoryQuery.data.name}
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
                        Edit Category
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing category over here. 
                    </SheetDescription>
                </SheetHeader>
                {isLoading ?  (
                    <div className="absolute inset-0 items-center justify-center flex">
                    <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                    </div>
                ):(
                    <CategoryForm
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