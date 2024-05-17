
"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuSeparator,
    DropdownMenuRadioItem
}
from "@/components/ui/dropdown-menu"

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

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { Edit, MoreHorizontal } from "lucide-react";
import { useState } from "react";

type Props = {
    id:string
}

export const Actions = ({id}:Props) => {
    const {onOpen} = useOpenAccount();
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
        disabled={false}
        onClick={()=>onOpen(id)}
        >
        <Edit className="size-4 mr-2"/>
            Edit
        <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Delete <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
    </>
    );
}

