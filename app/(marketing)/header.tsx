
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";
import {Loader} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BudgetLottie from "./duoLottie";
import { ModeToggle } from "@/components/mode-toggle";
// import { ModeToggle } from "@/components/mode-toggle";
// import DuoLottie from "./duoLottie";


const HeaderPage = () => {
  return ( 
    <header className="h-20 w-full border-b-2 border-slate-100
    dark:border-none
    px-4">
    <div className="h-full lg:max-w-screen-lg mx-auto items-center
    justify-between flex">
    <div className="pt-8 pb-7 flex items-center gap-x-1">
    <BudgetLottie/>
    <h1 className="uppercase hidden md:flex text-xl font-black text-indigo-500
    tracking-wide cursor-pointer">
    <Link href="/">
    expensify 💵
    </Link>
    </h1>
    </div>
    <div className="inline-flex gap-x-4 mt-2">
      <div className="mt-2">
    <ClerkLoading>
      <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
    </ClerkLoading>
    </div>
    <ClerkLoaded>
      <SignedIn>
        <div className="mt-1">
        <UserButton afterSignOutUrl="/"/>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/dashboard"
        mode="modal"
        >
        <Button variant="default">
          Enter
        </Button>
        </SignInButton>
      </SignedOut>
    </ClerkLoaded>
    <div className="hidden lg:flex">
    {/* <ModeToggle/> */}
    </div> 
    </div>
    </div>
    </header>
  );
}

export default HeaderPage;









