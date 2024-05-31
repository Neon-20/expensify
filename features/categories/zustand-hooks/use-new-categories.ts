import {create} from "zustand";

type NewCategoriesProps = {
    isOpen:boolean,
    onOpen:() => void,
    onClose:() => void
}


export const useNewCategoriesSheet = create<NewCategoriesProps> ((set)=>({
    isOpen:false,
    onOpen:() =>  set({isOpen:true}),
    onClose:() => set({isOpen:false})
}))