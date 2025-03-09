import { configureStore } from "@reduxjs/toolkit";
import { starWarsApi } from "./api/StarWarsAPI";
import { createWrapper } from "next-redux-wrapper";

 import selectedReducer from './StoreSelected'

export const store = () => configureStore({
     reducer: {
        [starWarsApi.reducerPath]: starWarsApi.reducer,
        selected: selectedReducer,
        
     },
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(starWarsApi.middleware),

})

export type AppStore =  ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export default createWrapper<AppStore>(store);