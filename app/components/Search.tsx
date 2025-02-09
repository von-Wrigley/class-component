import { useState } from "react";



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

type myAdd = (x:string) => void
interface MyClassProps {
  getdata: myAdd;

}

function Search({getdata}:MyClassProps) {
  const[value, setValue] =useState('')

 

function handleSubmit(event: React.FormEvent<HTMLFormElement>){
  event.preventDefault();
  getdata(value)
  localStorage.setItem('name', value);
}

  return (
    
    <>
   <div className="ml-auto mt-2 mr-auto max-w-fit">
   <form
        className="border items-center  p-3 flex flex-row gap-0.5 min-w-[30vw] rounded-2xl bg-gray-300 "
        onSubmit={handleSubmit}>
      <label>
        Name:
        <input
        className=" hover:bg-white rounded-md "
          required
          type="text"
          name="name"
          value={value}
          onChange={(e)=> setValue(e.target.value)}
        />
      </label>
      <input type="submit" value="Search" className="bg-white p-2.5 rounded-md hover:cursor-pointer "/>
    </form>

   </div>
    
  </>
  )
}

export default Search








