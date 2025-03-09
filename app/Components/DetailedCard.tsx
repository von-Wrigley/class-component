import { useContext } from "react";

import { Context } from "../context";
import { Dispatch, SetStateAction } from "react";
interface DeatilesPerson {
  birth_year?: string;
  created?: string;
  edited?: string;
  eye_color?: string;
  films?: string[];
  gender?: string;
  hair_color?: string;
  height?: string;
  homeworld?: string;
  mass?: string;
  name?: string;
  skin_color?: string;
  species?: string[];
  starships?: string[];
  url?: string;
  vehicles?: string[];
}



type fff ={
  setUseOpen: Dispatch<SetStateAction<boolean>>, 
  name?:string | undefined,
  data: DeatilesPerson,
}




const  DetailedCard = ({setUseOpen,data}: fff)=> {
const theme = useContext(Context)

       
    return (
   
        <div id="compDeatiled"  className='border ml-1.5 min-w-[15vw] rounded '>
               <h4>  {data.name}   </h4>     
               <p> Birth year:   {data.birth_year} </p>
               <p> height:    {data.height} </p>
               
               <button type="button" className={theme === 'light' ? 'lightButton' : 'blackButton'}  onClick={()=>setUseOpen((prev:boolean)=>!prev)}>закрыть</button>
       
               </div>
    
    )
  }
  export default DetailedCard
