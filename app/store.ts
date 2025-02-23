import { configureStore } from "@reduxjs/toolkit";
import { starWarsApi } from "./api/StarWarsAPI";

 import selectedReducer from './StoreSelected'

export const store = configureStore({
     reducer: {
        [starWarsApi.reducerPath]: starWarsApi.reducer,
        selected: selectedReducer,
        
     },
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(starWarsApi.middleware),

})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>