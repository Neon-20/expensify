"use client";
import { useUser } from "@clerk/nextjs";

const WelcomeMessage = () => {
    const {user,isLoaded} = useUser();

    return ( 
        <div className="space-y-3 mb-4">
            <h2 className="text-2xl text-white lg:text-4xl
            font-medium">
                Welcome Back {isLoaded ? ", ": " "}{user?.firstName} 😎
            </h2>
            <p className="text-sm lg:text-base text-[#aeadadd6] ml-1">
                This is your Expense Overview Report
            </p>
        </div>
    );
}

export default WelcomeMessage;