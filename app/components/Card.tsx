import React from 'react'
import { Link, useSearchParams } from 'react-router'
import DetailedCard from './DetailedCard';

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

function Card({data, setButton, useOpen}:any) {
  let [searchParams, setSearchParams] = useSearchParams();
  const value = localStorage.getItem("name")



const handleClick = ()=> {
  setButton((prev:boolean)=> !prev)
  const params = new URLSearchParams();
  params.set("name", value as string);
  setSearchParams(params, {
    preventScrollReset: true,
  });
   
}




  return (
    <div>
   {data?.filter((x:DeatilesPerson)=>x.name === value).map((d:DeatilesPerson, index:number)=>(
          <div key={index} className='border rounded flex flex-col gap-5 bg-black text-amber-100'>
            <p>{d.name}</p>
            <button   onClick={handleClick} className='border p-2 hover:bg-pink-200'>подробнее</button> 
           {useOpen===true && <DetailedCard />}
         </div>)
        )}
    </div>
  )
}

export default Card
