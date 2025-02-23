import { useEffect, useState } from "react";

import { setItem, getItem} from './utils/localStor'





export function usePersistedState(key:string, initialvalue:boolean){

const [value, setValue]= useState(()=> {
    const item = getItem(key)
    return item || initialvalue
})
 

useEffect(()=> {

setItem(key, value)

}, [key, value])


 return [value, setValue] as const
}