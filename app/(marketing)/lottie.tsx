"use client";
import animationData from "@/public/bank.json";
import Lottie from "lottie-react";
const LottieJson = () => {
    return ( 
    <Lottie
        animationData={animationData}
        className="flex items-center justify-center mt-4"
        loop={true}
    /> );
}

export default LottieJson;