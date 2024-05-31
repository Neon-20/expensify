
"use client";

import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useOpenCategory } from "@/features/categories/zustand-hooks/use-open-categories";
import { useDeleteCategory } from "@/features/categories/react-query/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
    id:string
}

export const Actions = ({id}:Props) => {
    const [ConfirmDialog,confirm] = useConfirm(
      "Are you sure to delete this category?",
      "You are about to delete this category."
    )

    const {onOpen} = useOpenCategory();
    const deleteMutation = useDeleteCategory(id);

    const handleDelete = async() => {
    const ok = await confirm();
    if(ok){
      deleteMutation.mutate()
    }
    }



    return ( 
        /* <>
        /* <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button
            variant="ghost" className="size-8 p-0"
            >
            <MoreHorizontal className="size-4"/>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuItem  
            disabled={false}
            onClick={()=>onOpen(id)}
            >
            <Edit className="size-4 mr-2"/>
            Edit
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </> */
    <>
    <ConfirmDialog/>
      <Menubar className="border-none w-fit hover:bg-white cursor-pointer ">
      <MenubarMenu>
        <MenubarTrigger asChild>
        <Button
            variant="ghost" className="size-8 p-0 hover:bg-white cursor-pointer"
            >
            <MoreHorizontal className="size-4"/>
            </Button>
        </MenubarTrigger>
        <MenubarContent align="end">
        <MenubarItem 
        disabled={deleteMutation.isPending}
        onClick={()=>onOpen(id)}
        >
        <Edit className="size-4 mr-2"/>
            Edit
        <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
          disabled={deleteMutation.isPending}
          onClick={handleDelete}
          >
            <Trash className="size-4 mr-2"/>
            Delete <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
    </>
    );
}

