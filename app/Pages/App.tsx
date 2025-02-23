import {  useState } from 'react'
import './App.css'
import Search from '../components/Search'
import CardList from '../components/CardList'
import SelectedCards from '../components/SelectedCards'
import {  useAppSelector } from "../hooks"
import { Context } from '../context'

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

function App() {
 

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




const Slectedpeople = useAppSelector(state => state.selected)


  return (
    <>
    
      <Context.Provider  value={theme}>
           <div className='flex flex-row   justify-between' >  
            <h1 className={theme === 'light' ? 'ClassLight' : 'ClassBlack'}>Star Wars</h1>
            <button  className={theme === 'light' ? 'lightButton' : 'blackButton'}    onClick={toggleStyle}>{theme}</button>
            </div>   
         
      <Search getData={getData}/>
      <CardList  value={searchData}/>

          {Slectedpeople.length > 0 && <SelectedCards />}  
      </Context.Provider>
      
    


      
     
     
    
     
    </>
  )
}

export default App

