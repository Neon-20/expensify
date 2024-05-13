"use client";
import animationData from "@/public/budget.json";
import Lottie from "lottie-react";
const BudgetLottie = () => {
    return ( 
    <Lottie
        animationData={animationData}
        className="h-20 flex items-center"
        loop={true}
    /> );
}

export default BudgetLottie;