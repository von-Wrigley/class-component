import { NavLink } from "react-router"


function Problem() {
  return (
   <>
    <div>
      <p className="text-9xl">404</p>
      <p  className="text-3xl">Page Not Found</p>
    </div>
    <div>
      <nav className="mt-4 text-2xl">
        <NavLink to='/'> Home </NavLink>
      </nav>
    </div>
   </>
  )
}

export default Problem
