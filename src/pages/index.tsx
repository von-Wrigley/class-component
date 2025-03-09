/* eslint-disable react-refresh/only-export-components */

import { Suspense } from 'react'
import {  useState } from 'react'
import Search from '../Components/Search'
import CardList from '../Components/CardList'
import SelectedCards from '../Components/SelectedCards'
import {  useAppSelector } from "../hooks"
import { Context } from '../context'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import Loading from './loading'
import { ParsedUrlQuery } from "querystring";



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
interface Params extends ParsedUrlQuery {
  query: string;
}



export const getStaticProps: GetStaticProps = (async (context) => {
  const query = context.params as Params
  
   const page = query || 1;
  const res = await fetch(`https://swapi.dev/api/people?page=${page}`)
  const data = await res.json()
  return { props: { data, 
                    currentPage: page, 
                    totalPages: data.results.length,

   } }
}) satisfies GetStaticProps<{
  data: Person
}>



export default function Page({
  data, totalPages
}: InferGetStaticPropsType<typeof getStaticProps>) {
 

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
console.log(Slectedpeople)

  return (
    <>

      <Context.Provider  value={theme}>
           <div className='flex flex-row   justify-between' >  
            <h1 className={theme === 'light' ? 'ClassLight' : 'ClassBlack'}>Star Wars</h1>
            <button  className={theme === 'light' ? 'lightButton' : 'blackButton'}    onClick={toggleStyle}>{theme}</button>
            </div>   
         
      <Search getData={getData}/>
      <Suspense fallback={<Loading />}> <CardList  value={searchData}  data={data} totalPages={totalPages}    />

          {Slectedpeople.length > 0 && <SelectedCards />}   </Suspense>
      </Context.Provider>
      
     


      
     
     
    
     
    </>
  )
}



