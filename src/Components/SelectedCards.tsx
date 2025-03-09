import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import { removeAllSelected } from '../StoreSelected';
import { Context } from '../context';


function SelectedCards() {

const theme= useContext<string>(Context);
  const Slectedpeople = useAppSelector(state => state.selected.selectedPeople) 
const dispatch = useAppDispatch()






const handleUnselect =()=> {
      dispatch(removeAllSelected())
      
     }



const selectedArray = [...Slectedpeople]




 const headers = ["Name", "Gender", 'Eye'].join(',')



  const usersCsv = selectedArray.reduce((acc, user) =>{
      const {name, gender, eye_color} = user
      acc.push([name, gender, eye_color].join(','))
      return acc


 }, [] as string[])

 const DownloadedData = [headers, ...usersCsv].join('\n')
 const blob = new Blob([DownloadedData], { type: 'text/csv' })
const x = window.URL.createObjectURL(blob)






  return (
    <>
    <div  className={theme === 'light' ? ' border p-3.5 rounded text-amber-100 absolute bottom-0 right-0 ' : ' border p-3.5 rounded  text-black absolute bottom-0 right-0  '}>
      <h1>Selected Card</h1>
       {Slectedpeople.length === 1 ?  <p>{Slectedpeople.length} is selected</p> : <p>{Slectedpeople.length} are selected</p>     }
      <div className="flex gap-7">
          <button onClick={handleUnselect} className={theme === 'light' ? 'lightButton' : 'blackButton'}>Unselect all</button>
          <button className={theme === 'light' ? 'lightButton' : 'blackButton'}><a href={x}  download={`${selectedArray.length}_people.csv`}>  Download</a></button>
         </div>
     
     
     

      
    </div>

  

  </>
  )
}

export default SelectedCards
