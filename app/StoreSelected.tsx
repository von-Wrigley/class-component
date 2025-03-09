import { createSlice, type PayloadAction  } from "@reduxjs/toolkit"

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

interface State {
  selectedPeople: DeatilesPerson[];
}
const initState = {
  selectedPeople: [],
}

const StoreSelecedSlice = createSlice({
    name: 'selectedItems',
    initialState: initState as State,
    reducers: {
        selected: (state, action: PayloadAction<DeatilesPerson>) => {
           state.selectedPeople.push(action.payload)
           
        },
        removeItemSelected: (state, action)=> {
             return {
              selectedPeople:   [ ...state.selectedPeople].filter((x)=> x.name !==action.payload)
             } 
        },
        removeAllSelected: ()=> {
      return {selectedPeople: []}
       
        

    },
    getCheckboxState: (state)=> {
                   return state
    },   
    }
})
  export const {selected,  removeItemSelected,getCheckboxState, removeAllSelected } = StoreSelecedSlice.actions
export default StoreSelecedSlice.reducer



