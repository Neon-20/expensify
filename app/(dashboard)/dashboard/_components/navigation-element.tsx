"use client";

import { usePathname } from "next/navigation";
import NavButton from "./nav-Button";
import {useMedia} from "react-use";
import{
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetClose,
    SheetHeader,
    SheetTitle,
    SheetTrigger
}
from "@/components/ui/sheet"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { HoverEffect } from "@/components/card-hover-effect";

export const routes = [
    {
    href:"/dashboard",
    label:"Overview"
    },
    {
        href:"/transactions",
        label:"Transactions"
    },
    {
        href:"/accounts",
        label:"Accounts"
    },
    {
        href:"/categories",
        label:"Categories"
    },
    {
        href:"/settings",
        label:"Settings"
    },
]


const NavigationElement = () => {
    const pathname = usePathname();
    const[isOpen,setIsOpen] = useState(false);
    const router = useRouter();
    const isMobile = useMedia("(max-width: 1024px)",false)

    const onClick = (href:string) => {
        router.push(href)
        setIsOpen(false);
    }

    if(isMobile){
        return(
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                <Button
                className="font-normal bg-[#A1A1A1]/10 hover:bg-[#A1A1A1]/20
                hover:text-white outline-none text-white transition
                border-none focus:visible:ring-offset-0 focus:visible:ring-transparent
                focus:bg-[#A1A1A1]
                "
                size="sm"
                variant="primaryOutline"
                >
                    <Menu className="h-4 w-4"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-2">
            <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route)=>(
                <Button
                key={route.href}
                variant={route.href === pathname ? "default" : "ghost"}
                onClick={()=>onClick(route.href)}
                className="w-full justify-start"
                >
                {route.label}
                </Button>
            ))}
            </nav>
            </SheetContent>
            </Sheet>
        )
    }

    return ( 
        <nav className="hidden lg:flex items-center gap-x-2
        overflow-x-auto hover:transition hover">
        {routes.map((route)=>(
        <NavButton
        key={route.href}
        href={route.href}
        label={route.label}
        isActive={pathname === route.href}
        />
        ))}
        </nav>
    );
}

export default NavigationElement;