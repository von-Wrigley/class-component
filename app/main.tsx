import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Page from './pages/index.tsx'
// import { BrowserRouter, Routes, Route } from "react-router";

// import { Provider } from 'react-redux'
// import { store } from './store.ts';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Provider store={store}>
   <BrowserRouter>
    <Routes>
      <Route index  element={<Page />} />
    </Routes>
    </BrowserRouter>
    </Provider> */}
  </StrictMode>,
)


