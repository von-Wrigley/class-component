
import Card from './Card';
import { useGetPeopleQuery } from '../api/StarWarsAPI';
import Spinner from './Spinner';
import Pagination from './Pagination';




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
  value:string;
}



export default function CardList({value}: MyProps){

    
 
 
 const itemsPerPage=3;
 const params = new URLSearchParams(document.location.search);
//  const [searchQuery, setSearchQuery] = useState(searchParams.get("page"));
const pageCurrent = parseInt(params.get('page') as string)
const {data, isLoading} = useGetPeopleQuery(pageCurrent)
 
 



 
 const startIndex = (pageCurrent - 1) * itemsPerPage;
 const endIndex = startIndex + itemsPerPage;
 const currentItems = data?.results.slice(startIndex, endIndex);






if(isLoading) return <Spinner />
    return (
   <>      
   
{ value  &&   currentItems?.filter(x=>x.name === value ).map( (x, index)=> 
<div key={index} className='border rounded flex flex-row gap-5 mb-6 bg-black text-amber-100 justify-evenly'>
    <p>{x.name}</p>
    </div> )}
            
  { value === '' && <div className=' flex flex-col p-2'>
           {currentItems?.map((info)=> (<Card  info={info} key={info.height}  />)   ) }
           </div>}


  

       <Pagination />
  
       

</>

)
}
