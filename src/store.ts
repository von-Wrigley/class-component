import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

 import selectedReducer from './StoreSelected'

export const store = () => configureStore({
     reducer: {
 
        selected: selectedReducer,
        
     },


})

export type AppStore =  ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export default createWrapper<AppStore>(store);
