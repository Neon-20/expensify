
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { insertCategorySchema } from "@/db/schema";
import {  useForm } from "react-hook-form";
import { Form,FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";


const formSchema = insertCategorySchema.pick({
    name:true,
})

type FormValues = z.input<typeof formSchema>

type Props = {
    id?:string,
    defaultValues?:FormValues,
    onSubmit:(values:FormValues) => void;
    onDelete?:() => void;
    disabled?:boolean
}

export const CategoryForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled
}:Props) => {
    const form = useForm<FormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:defaultValues
    })

    const handleSubmit = (values:FormValues) => {
        onSubmit(values);
    }
    const handleDelete = () => {
        onDelete?.()
    }

    return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-6">
        <FormField
        name="name"
        control={form.control}
        render = {({field})=>(
        <FormItem>
        <FormLabel>
            Name
        </FormLabel>
        <FormControl>
            <Input
            disabled={disabled}
            placeholder="Food, Travel etc."
            {...field}
            />
        </FormControl>
        </FormItem>
        )}
/>
        <Button
        className="w-full mt-4 "
        variant="super"
        // onClick={handleSubmit}  
        disabled={disabled}
        >
            {id ? "Save Changes" : "Create Category"}
        </Button>
        {!!id && <Button
        // we have to specify type = "button" otherwise it will act like submit
        type="button"
        className="w-full mt-2"
        disabled={disabled}
        variant="dangerOutline"
        onClick={handleDelete}
        >
            <Trash className="size-2 mr-4"/>
            Delete Category
        </Button>}
        </form>
        </Form>
    )
}