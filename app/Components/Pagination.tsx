import { useRouter } from "next/navigation";


function Pagination({totalPages}:{totalPages:number}) {
const router = useRouter()

const handlepagination = (page:number) => {
  router.push(`?page=${page}`, undefined,);
}


return (
    
    <>
  
    <div >
    {Array.from({ length: totalPages/4 }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlepagination(page)}
         className='bg-pink mr-2.5 text-white p-2 hover:cursor-pointer rounded'
        >
          {page}
        </button>
      ))}
         
     {/* {pages.map((page)=> 
      (  <button key={page}  className='bg-black mr-2.5 text-white p-2 hover:cursor-pointer rounded' onClick={() => handlepagination(page)}>{page}</button>)
     
     )} */}
     
    </div>
    </>
    
   
  )
}
export default Pagination
