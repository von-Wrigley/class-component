import { createSlice} from "@reduxjs/toolkit"
import type {  PayloadAction } from "@reduxjs/toolkit"

const initState = [] as string[]

const StoreSelecedSlice = createSlice({
    name: 'selectedItems',
    initialState: initState,
    reducers: {
        selected: (state, action: PayloadAction<string>) => {
           state.push(action.payload)
      
        },
        removeItemSelected: (state, action)=> {
             return  state.filter((state)=> state !==action.payload)
                      
             
                //  return {
                //   todos: state.todos.map(todo => {
                //     if(todo.value !== action.payload){
                //       return todo
                //     }
                //   return todo
                  
                  
                  
                //   })
                //  }
            
        },
        removeAllSelected: ()=> {
      return  []  
       
        

    },
    getCheckboxState: (state)=> {
                   return state
    },
   
    }

})

  export const {selected,  removeItemSelected,getCheckboxState, removeAllSelected } = StoreSelecedSlice.actions
export default StoreSelecedSlice.reducer


