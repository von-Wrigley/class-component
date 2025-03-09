import  { useContext, useState } from 'react'
import DetailedCard from './DetailedCard';
import { selected, removeItemSelected} from '../StoreSelected';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Context } from '../context';
import { Suspense } from 'react'
import Spinner from './Spinner';


type CardType = {
  data: DeatilesPerson,
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

function Card({data}: CardType) {
  const dispatch = useAppDispatch()
const selectedChekced = useAppSelector(state => state.selected.selectedPeople) 


const [useOpen, setUseOpen] = useState<boolean>(false)
const [, setChecked] = useState<boolean>(false);
const theme= useContext<string>(Context);





const handleClick = ()=> {

  setUseOpen((prev:boolean)=> !prev)

 


}


const selectedNames = selectedChekced.map((x)=> x.name)

const handleSelected = (e: React.ChangeEvent<HTMLInputElement>)=>{ 
  setChecked(true)
  dispatch(selected(data))
  
if(selectedNames.includes(e.target.value)){
  setChecked(false)
  dispatch(removeItemSelected(e.target.value))
}


  


}


  return (

 <div  className={theme === 'light' ? 'border rounded flex flex-row gap-5 mb-6 justify-between text-amber-100  mx-auto' : 'flex flex-row gap-5 mb-6 mx-auto text-black w-[25vw]  '}>
   <div className='flex flex-col border rounded p-20'>
     <p className='text-3xl bg-pin   '>{data.name}</p>
    <button   onClick={handleClick} className={theme === 'light' ? 'lightButton' : 'blackButton'}>подробнее</button> 
    <input type="checkbox" className='mb-2' name={data.name} checked={selectedNames.includes(data.name)} id={data.height}    value={data.name} onChange={(e)=> handleSelected(e)}></input>
  </div>
           
  {useOpen &&  <Suspense fallback={<Spinner />}> <DetailedCard setUseOpen={setUseOpen} name={data.name} data={data}   /> </Suspense> }
   </div>
       
        
        )
        
   
  
}

export default Card
