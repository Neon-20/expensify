"use client";

import { EditAccountSheet } from "@/features/accounts/components/edit-account";
import { NewAccountSheet } from "@/features/accounts/components/new-account";
import { useEffect, useState } from "react";
import { useMountedState } from "react-use";

export const NewAccountSheetProvider = () => {
    const isMounted = useMountedState();
    if(!isMounted){
        return null;
    }
    
    return(
        <>
        <NewAccountSheet/>
        <EditAccountSheet/>
        </>
    )
}