import BudgetLottie from "@/app/(marketing)/duoLottie";
import Image from "next/image";
import Link from "next/link";

const HeaderLogo = () => {
    return ( 
        <Link href="/">
        <div className="hidden items-center lg:flex">
        <BudgetLottie/>
        <p className="uppercase tracking-wide stroke-[3] font-bold text-2xl text-white ml-1.0">
        Expensify
        </p>
        </div>
        </Link>
    );
}

export default HeaderLogo;