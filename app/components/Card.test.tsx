import {render, screen, toBeInTheDocument} from "@testing-library/react"
import Card from "./Card"
import {describe, it, expect } from 'vitest'

import '@testing-library/jest-dom';

describe('Card', ()=> {
   it(" click", async ()=>{
    render(<Card />);
    const button = screen.getByRole('button')
    
          
         button.click()
        expect(document.getElementById("compDeatiled")).toBeInTheDocument();
        
      





} )                      

}




 )