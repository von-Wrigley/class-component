import { configureStore } from '@reduxjs/toolkit';
import simpleFormReducer from './FormSlice'
import controlledFormReducer from './FormHookSlice'

export const store = configureStore({
  reducer: {
    uncontolledFormation: simpleFormReducer,
    controlledFormation: controlledFormReducer,
  },
});

export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;

