import React, { useState } from 'react';

import DetailedCard from './DetailedCard';
import Card from './Card';


export interface Person  {
  count: number;
  next: string;
  previous: null;
  results: DeatilesPerson[];
 
}

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



interface MyProps {
  data: DeatilesPerson[];
  value:string;
}



export default function CardList({data, value}:MyProps){

 const [useOpen, setUseOpen] =useState(false)

const localStorageValue = localStorage.getItem("name")

    return (
   <>
     
        

      
      <div className='flex flex-row'>
        <div className=' w-[30vw]'>
        {value ==="" ? (data.map((d, index:number)=>(
          <div key={index} className=' flex flex-col gap-5'>
            <p className='bg-black rounded text-amber-100 text-3xl p-3.5 mb-3.5'>{d.name}
              </p> 
         </div>)
        ))
        
        : <Card data={data} setButton={setUseOpen}/>
        }
        </div>
        
        
          {useOpen===true &&  <p>
            <DetailedCard data={data} setButton={setUseOpen}  useOpen={useOpen}/>
         
          </p> }

      </div> 
       {/* <Pagination /> */}
  
       

     </>

)
}

