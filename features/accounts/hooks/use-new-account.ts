import {create} from "zustand";

type NewAccountProps = {
    isOpen:boolean,
    onOpen:() => void,
    onClose:() => void
}


export const useNewAccountSheet = create<NewAccountProps> ((set)=>({
    isOpen:false,
    onOpen:() =>  set({isOpen:true}),
    onClose:() => set({isOpen:false})
}))