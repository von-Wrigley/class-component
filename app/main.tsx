import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Pages/App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Problem from './Pages/Problem.tsx';
import { Provider } from 'react-redux'
import { store } from './store.ts';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
   <BrowserRouter>
    <Routes>
      <Route index  element={<App />} />
      <Route path="*" element={<Problem />} />
    </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
