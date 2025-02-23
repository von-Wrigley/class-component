import  { useContext, useState } from 'react'

import DetailedCard from './DetailedCard';
import { useGetPeopleQuery } from '../api/StarWarsAPI';
import Spinner from './Spinner';
import { selected, removeItemSelected} from '../StoreSelected';
import { useAppDispatch } from '../hooks';
import { Context } from '../context';


type CardType = {
  info: DeatilesPerson,
  key: string | undefined,
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

function Card({info}: CardType) {
  const dispatch = useAppDispatch()



  const { isLoading} = useGetPeopleQuery(1);

const [useOpen, setUseOpen] = useState<boolean>(false)
const [checked, setChecked] = useState<boolean>(false);
const theme= useContext<string>(Context);





const handleClick = ()=> {

  setUseOpen((prev:boolean)=> !prev)
  



}

const handleSelected = (e: React.ChangeEvent<HTMLInputElement>)=>{ 
  if(checked===false){
    setChecked((prev)=> !prev)
    dispatch(selected(e.target.value))
  }
  else{
    setChecked((prev)=> !prev)
    dispatch(removeItemSelected(e.target.value))
  }
}

if (isLoading) return <Spinner />
  return (
 

          <div  className={theme === 'light' ? 'border rounded flex flex-row gap-5 mb-6 justify-between text-amber-100  mx-auto' : 'flex flex-row gap-5 mb-6 mx-auto text-black w-[25vw]  '}>
            <div className='flex flex-col border rounded p-20'>
            <p className='text-3xl'>{info.name}</p>
            <button   onClick={handleClick} className={theme === 'light' ? 'lightButton' : 'blackButton'}>подробнее</button> 
            <input type="checkbox" className='mb-2' name={info.name} checked={checked} id={info.height}  value={info.name} onChange={(e)=> handleSelected(e)}></input>
            </div>
           
           {useOpen && <DetailedCard setUseOpen={setUseOpen} name={info.name}   />}
         </div>
       
        
        )
        
   
  
}

export default Card

