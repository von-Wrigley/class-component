
import { Outlet, useParams } from 'react-router'

function Problem() {
  const {page} = useParams()
  return (
    <div>
      <Outlet />
     <p>outlet</p>
     {page}

    
    </div>
  )
}

export default Problem
