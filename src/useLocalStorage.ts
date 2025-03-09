import { useEffect, useState } from "react";




export default function useLocalStorage() {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem('name')) ?? ''
  );

  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(value));
  }, [value]);

  return [value, setValue];

}








// export const useLocalStorage=(key:string)=> {
  

 
  
  
// }


// // const setItem  = (value:unknown)=> {
    
//   try {
//     window.localStorage.setItem(key, JSON.stringify(value))
//   } catch (error) {
//     console.log(error)
//   }


// }

// const getItem = ()=> {

//   try {
//   const item =   window.localStorage.getItem(key)
//   return item ? JSON.parse(item) : ''
  
//   } catch (error) {
//     console.log(error)
//   }


// }



// return  {setItem, getItem}