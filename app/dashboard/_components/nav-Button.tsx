import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
    href:string,
    label:string,
    isActive:boolean
}

const NavButton = ({
    href,
    label,
    isActive
}:Props) => {
    return ( 
        <Button
        asChild
        size="sm"
        variant="ghost"
        className={cn(`w-full lg:w-auto 
        justify-between hover:bg-[#2c2c2c] hover:text-white
        border-none focus:visible:ring-offset-0 focus:visible:ring-transparent
        outline-none text-white focus:bg-[#2c2c2c] transition
        `,
            isActive ? "bg-[#2c2c2c] text-white" : "bg-transparent"
        )}
        >
        <Link href="/">
            {label}
        </Link>
        </Button>
    );
}

export default NavButton;