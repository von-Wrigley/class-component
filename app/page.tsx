'use client'

import React, { Suspense, useEffect } from 'react'
import {  useState } from 'react'
import Search from './Components/Search'
import CardList from './Components/CardList'
import SelectedCards from './Components/SelectedCards'
import {  useAppSelector } from "../app/hooks"
import { Context } from '../app/context'
import Spinner from './Components/Spinner'




export interface Person {
  count: number;
  next: string;
  previous: null;
  results: DeatilesPerson[];
}
export interface DeatilesPerson {
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







export default function Page() {
    const [data, setData] = useState<Person| undefined>(undefined)
    useEffect(() => {
        async function fetchPosts() {
          const res  = await fetch('https://swapi.dev/api/people')
          const data:Person  = await res.json()
          setData(data)
        }
        fetchPosts()
      }, [])

const totalPages = data?.results.length as number
const [theme, setTheme] = useState<string>('light');
const [searchData, getData] = useState<string>('')


function toggleStyle() {
  setTheme(theme => (theme === "light" ? "black" : "light"));

  const currentTheme = document.documentElement.getAttribute('data-theme')
  let targetTheme = 'light'

  if(currentTheme ==='light'){
    targetTheme = 'black'
  }
  document.documentElement.setAttribute('data-theme', targetTheme)

}




const Slectedpeople = useAppSelector(state => state.selected.selectedPeople)


if(!data) return <Spinner />
  return (
    <>

      <Context.Provider  value={theme}>
        <div className='flex flex-col'> 
           <div className='flex flex-row   justify-between' >  
            <h1 className={theme === 'light' ? 'ClassLight' : 'ClassBlack'}>Star Wars</h1>
            <button  className={theme === 'light' ? 'lightButton' : 'blackButton'}    onClick={toggleStyle}>{theme}</button>
            </div>   
         
      <Search getData={getData}/>
      <Suspense fallback={<p className='bg-amber-300'>dsfsssssssssssssssss</p>}> <CardList  value={searchData}  data={data} totalPages={totalPages}/> </Suspense>

          {Slectedpeople.length > 0 && <SelectedCards />}  

          </div>  
      </Context.Provider>
      
     


      
     
     
    
     
    </>
  )
}



