import { useContext } from "react";
import { useGetPeopleQuery } from "../api/StarWarsAPI";
import { Context } from "../context";
import type { Dispatch, SetStateAction } from "react";


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
  name:string | undefined,
}


// interface Setus {
//   setUseOpen: Dispatch<SetStateAction<boolean>>, 
// }


const  DetailedCard = ({setUseOpen, name}: fff)=> {
const theme = useContext(Context)
const params = new URLSearchParams(document.location.search);
const pageCurrent = parseInt(params.get('page') as string)
console.log(params)

  const {data} = useGetPeopleQuery(pageCurrent)
    
  console.log(data)

  const dataValues:undefined | DeatilesPerson[]= data?.results 
  const selectedArray = []
  for (const value of dataValues as  DeatilesPerson[]  ) {
    if( name?.includes(value.name as string))  {
              selectedArray.push(value)
    }   
   
  }
 
 
    return (
   
        <div id="compDeatiled"  className='border ml-1.5 min-w-[15vw] rounded '>
                 {selectedArray.map((x)=> (
                    <div key={x.height}>
                      <p>eye color : {x.eye_color}</p>
                      <p>gender: {x.gender}</p>
                    </div>
                  ))}
               
                    <button type="button" className={theme === 'light' ? 'lightButton' : 'blackButton'}  onClick={()=>setUseOpen((prev:boolean)=>!prev)}>закрыть</button>
                </div>
    
    )
  }
  export default DetailedCard
