import {  useState } from "react";
import type { Dispatch, SetStateAction } from "react";



export interface Person {
  count: number;
  next: string;
  previous: string;
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
export type Link = string | '';


interface MyClassProps {
  getData: Dispatch<SetStateAction<string>>

}

function Search({getData}:MyClassProps) {
  const[value, setValue] =useState('')



const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
 getData(value)
}


  return (
    
    <>
   <div className="ml-auto mt-2 mr-auto max-w-fit">
   <form
   name="Search"
        className="border items-center  p-5 flex flex-row gap-5 min-w-[30vw] rounded-2xl bg-gray-300 "
        onSubmit={handleSubmit}>
      
      <label>
        Name:  
        <input
        className=" rounded-md p-2.5 ml-2.5 hover:tetx-black "
          required
          type="text"
          name={value}
          id="inputSearch"
          value={value}
          onChange={(e)=> setValue(e.target.value)}
        />
      </label>
      <input type="submit" value="Search" name="search" id="search" className="bg-white rounded-md hover:cursor-pointer text-black p-2.5"/>
    </form>
   </div>
    
  </>
  )
}

export default Search
