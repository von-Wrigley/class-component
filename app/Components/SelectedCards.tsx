import { useContext } from "react";

import { useAppDispatch, useAppSelector } from "../hooks"
import { removeAllSelected } from '../StoreSelected';
import { Context } from '../context';




function SelectedCards() {

const theme= useContext<string>(Context);
const Slectedpeople = useAppSelector(state => state.selected.selectedPeople) 

console.log(Slectedpeople)
const dispatch = useAppDispatch()






const handleUnselect =()=> {
      dispatch(removeAllSelected())
      
     }


   
    
//  const intersection = array1.filter(element => array2.includes(element));
   
// console.log( data?.results.map((x)=> x.name).filter(x=> Slectedpeople.includes(x))  )
// const x = data?.results
// const newASelected = x?.filter((obj)=> obj.name?.includes("C-3PO")).map(obj => ( obj.name ))







const selectedArray = [...Slectedpeople]

// const selectednames = [] 

// for (const value of Slectedpeople) {
//   selectednames.push(value.name)
       
//  }




// for (const value of dataValues as  DeatilesPerson[]  ) {
//   if( Slectedpeople.includes(value.name as string))  {
//             selectedArray.push(value)
//   }   
 
// }



// const downloadFile = ({ data, fileName, fileType }) => {
//   const blob = new Blob([data], { type: fileType })
//   const a = document.createElement('a')
//   a.download = fileName
//   a.href = window.URL.createObjectURL(blob)
//   const clickEvt = new MouseEvent('click', {
//     view: window,
//     bubbles: true,
//     cancelable: true,
//   })
//   a.dispatchEvent(clickEvt)
//   a.remove()
// }

// const handleDownload=(e)=>{
//   e.preventDefault()
//   const headers = ['Name. Gender']
//   const usersCsv = selectedArray.reduce((acc, user) =>{
//       const {name, gender} = user
//       acc.push([name, gender].join(','))
//       return acc


//  }, [])

//  downloadFile({
//   data: [...headers, ...usersCsv].join('\n'),
//   fileName: `${Slectedpeople.length}_people.csv`,
//   fileType: 'text/csv',
//  })

// }




// const download = (e) => {
//   e.preventDefault()
//   const headers = ['Name. Gender']
//   const usersCsv = selectedArray.reduce((acc, user) =>{
//       const {name, gender} = user
//       acc.push([name, gender].join(','))
//       return acc
// const filenewame = `${Slectedpeople.length}_people.csv`
//  }, [])

//   const dummyData = [...headers, ...usersCsv].join('\n');
//   const csvContent = `data:text/csv; filenewame*=utf-8,${dummyData}`;
//   const encodedURI = encodeURI(csvContent);
//   window.open(encodedURI);
// };



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
