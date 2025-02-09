import  {  useEffect, useState } from "react";

import '../app.css';


import { Outlet, useParams } from "react-router";
import Search from "~/components/Search";
import Spinner from "~/components/Spinner";
import CardList from "~/components/CardList";
import Pagination from "~/components/Pagination";

export interface Person {
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
export type Link = string | '';


export default function App() {
const {page}=useParams()
const [currentPage, setCurrentPage]=useState(1)
const [postsPerPage, setPostsPerPage]=useState(3)

const [searchData, setSearchData] = useState<string>('')
const [allData, setAllData] = useState([])
 const[loading, setLoading]= useState(true);



const setData = (x:string)=> {
  setSearchData(x)

}


useEffect(() => {
 
  fetch(
    `https://swapi.dev/api/people`
  )
    .then((response) => response.json())
    .then((data) => {
      setAllData(data.results);
  
    });
    setLoading(false)
}, [page]);


 const lastPostIndex = currentPage * postsPerPage;
 const firstPostIndex = lastPostIndex - postsPerPage;
 const currentposts = allData.slice(firstPostIndex, lastPostIndex) 
  return (
    <>
       
      <Search getdata={setData}/>

      {loading ? <Spinner /> : (  
        <> 
        <div className="flex flex-row gap-4 mt-8">
        <CardList data={currentposts} value={searchData} /> 
        <Outlet />
        </div>
        

         <Pagination totalPosts={allData.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}   />
        </>
        )}
    
    
      

    </>
  );
}
