import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import HeaderLogo from "./headerLogo";
import NavigationElement from "./navigation-element";
import { Loader2 } from "lucide-react";
import WelcomeMessage from "./welcome-msg";

const HeaderPage = () => {
    return ( 
        <header className="bg-gradient-to-b from-[#191919] to-[#191919]
        px-4 py-8 lg:px-14 pb-32">
            {/* don't want to make responsivity if e */}
            <div className="max-w-screen-2xl mx-auto text-slate-200">
                <div className="w-full flex items-center justify-between mb-12">
                <div className="flex items-center lg:gap-x-32">
                <HeaderLogo/>  
                <NavigationElement/> 
                </div>
                <ClerkLoaded>
                <UserButton afterSignOutUrl="/"/>
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader2 className="size-8 animate-spin text-slate-200"/>
                </ClerkLoading>
                </div>
                <WelcomeMessage/>
            </div>
        </header>
    );  
}

export default HeaderPage;