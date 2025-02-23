import { useContext } from "react"
import { Context } from './main'


function ChangeContext() {
    const {theme, setTheme} = useContext(Context)  

  // const className = 'button-' + theme;
  function handleClick() {
    setTheme(theme => (theme === "light" ? "black" : "light"));
  } 
   return (
    <div>
      <div className={theme === 'light' ? 'lightButton' : 'blackButton'}>
      <h1>Change Cntext</h1>
      
      <p>Lorem ipsum llendus hic aliquam.</p>
      <button onClick={handleClick}>{theme}</button>
    </div>
    </div>
  )
}

export default ChangeContext
