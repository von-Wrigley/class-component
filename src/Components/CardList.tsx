
import { useRouter } from 'next/router';
import Card from './Card';
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
  data: Person;
  totalPages: number;

}



export default function CardList({value, data, totalPages}: MyProps){
 
  const router = useRouter();
  const { query } = router;

  const itemsPerPage = 4
  const currentPage = parseInt(query.page as string) || 1;


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.results.slice(startIndex, endIndex);


     

const names = currentItems.map((x)=> x.name)

  console.log(value)


    return (
   <>      
   {names.includes(value)   &&    currentItems.filter((x)=> x.name ===value).map((x)=> (
            <Card key={x.height}   data={x}/>
   ))}
  
    { value=== '' &&    currentItems.map((item)=> (
             
      <Card   key={item.height}   data={item}    />
    ))      }

    

       <Pagination  totalPages={totalPages}     />
  
       

</>

)
}
