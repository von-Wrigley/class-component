import { createContext } from "react";
// type StateContextType = {
//     theme: string;
//     setTheme: React.Dispatch<React.SetStateAction<string>>;
//   };
  

export const Context = createContext<string>('light');