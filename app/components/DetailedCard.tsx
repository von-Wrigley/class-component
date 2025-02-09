
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


function DetailedCard({data, setButton}:any) {


 const cachedValue = localStorage.getItem('name');
  return (
 
      <div id="compDeatiled"  className='border ml-1.5 min-w-[15vw] rounded'>
               
                {data.filter((x:DeatilesPerson)=>x.name === cachedValue).map((d:DeatilesPerson, index:number)=>(<div key={index} className='bg-black text-amber-50  px-5.5'>
                    <h3 className="text-3xl">{d.name}</h3> 
                    <p>Height: {d.height}</p> 
                    <p>Weight: {d.mass}</p>
                  </div>))}
                  <button type="button" className='border bg-black text-amber-50 hover:bg-neutral-600 hover:cursor-pointer' onClick={()=>setButton((prev:boolean)=>!prev)}>закрыть</button>
              </div>
  
  )
}

export default DetailedCard
