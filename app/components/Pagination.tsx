
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useGetPeopleQuery } from '../api/StarWarsAPI';





function Pagination() {
  const [currentPage, setCurrentPage]=useState(1)
 const pages = [];
 const totalPosts = 10;
 const postsPerPage = 3
 const [searchParams, setSearchParams] = useSearchParams();

 for (let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
    pages.push(i)
 }



const {isLoading} = useGetPeopleQuery( currentPage )



if(isLoading) return <p>Loding</p>
return (
    
    <>
  
    <div >
      
         
     {pages.map((page, index)=> 
      (  <button key={index}  className='bg-black mr-2.5 text-white p-2 hover:cursor-pointer rounded' onClick={()=>{ setCurrentPage(page)
        const params = new URLSearchParams();
         params.set("page", page?.toString());
         setSearchParams(params)
      
      }}>{page}</button>)
     
     )}
     
    </div>
    </>
    
   
  )
}
export default Pagination
