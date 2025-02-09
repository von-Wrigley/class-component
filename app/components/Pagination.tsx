import React from 'react'
import { useParams, useSearchParams } from 'react-router';





function Pagination({totalPosts, postsPerPage, setCurrentPage}:any) {
 let pages = [];
 let [searchParams, setSearchParams] = useSearchParams();

 for (let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
    pages.push(i)
 }

 const {page, card} = useParams();


  return (
    
    <>
   {page}
   {card}
    <div>
        {/* <nav>
            <button onClick={()=>setCurrentPage(page-1)}>наззад</button>
            <button onClick={()=>setCurrentPage(page+1)}>вперед</button>
        </nav> */}
         
     {pages.map((page, index)=> 
      (  <button key={index}  className='bg-black mr-2.5 text-white p-2 hover:cursor-pointer rounded' onClick={()=>{    setCurrentPage(page)
        const params = new URLSearchParams();
    params.set("page", page?.toString());
    setSearchParams(params, {
      preventScrollReset: true,
    });
      }}>{page}</button>)
     
     )}
     
    </div>
    </>
    
   
  )
}

export default Pagination
