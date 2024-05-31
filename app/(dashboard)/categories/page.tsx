"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlusIcon } from "lucide-react";
import { columns} from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingPage from "./fancy-loading";
import { useNewCategoriesSheet } from "@/features/categories/zustand-hooks/use-new-categories";
import { useGetCategories } from "@/features/categories/react-query/use-get-category";
import { useBulkDeleteCategories } from "@/features/categories/react-query/use-bulk-delete-categories";



const CategoriesPage = () => {
    const newCategory = useNewCategoriesSheet();
    const categoriesQuery = useGetCategories();
    const bulkDelete = useBulkDeleteCategories();

    const isDisabled = categoriesQuery.isLoading || 
    bulkDelete.isPending 

    if(categoriesQuery.isLoading){
        return(
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
        <CardContent>
            <div className="flex items-center w-full h-[500px]
            justify-center">
            <LoadingPage/>
            </div>
        </CardContent>
        </Card>
        </div>
        )
    }

    return ( 
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:items-center lg:justify-between 
                lg:flex-row">
                    <CardTitle className="text-xl line-clamp-1">
                    Categories Page
                    </CardTitle>
                    <Button 
                    onClick={newCategory.onOpen}
                    variant="primary">
                        <PlusIcon className="size-4 mr-2"/>
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                <DataTable 
                onDelete={(row) => {
                    const ids = row.map((r)=> r.original.id);
                    bulkDelete.mutate({ids})
                }}
                filterKey="name"
                columns={columns} 
                data={categoriesQuery.data || []} 
                disabled={isDisabled}
                />
                </CardContent>
            </Card>
        </div>
    );
}

export default CategoriesPage;