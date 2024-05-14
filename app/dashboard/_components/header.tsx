import { UserButton } from "@clerk/nextjs";
import HeaderLogo from "./headerLogo";
import NavigationElement from "./navigation-element";

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
                <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </header>
    );  
}

export default HeaderPage;