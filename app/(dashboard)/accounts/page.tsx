"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccountSheet } from "@/features/accounts/hooks/use-new-account";
import { Loader2, PlusIcon } from "lucide-react";
import { columns} from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAccounts } from "@/features/accounts/react-query/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingPage from "./fancy-loading";
import { useDeleteAccounts } from "@/features/accounts/react-query/use-bulk-delete";



const AccountsPage = () => {
    const newAccount = useNewAccountSheet();   
    const accountsQuery = useGetAccounts();
    const bulkDelete = useDeleteAccounts();

    const isDisabled = accountsQuery.isLoading || 
    bulkDelete.isPending 

    if(accountsQuery.isLoading){
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
                    Account Page
                    </CardTitle>
                    <Button 
                    onClick={newAccount.onOpen}
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
                filterKey="email"
                columns={columns} 
                data={accountsQuery.data || []} 
                disabled={isDisabled}
                />
                </CardContent>
            </Card>
        </div>
    );
}

export default AccountsPage;