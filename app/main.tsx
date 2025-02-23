import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router";
import Problem from './Pages/Problem';
import { Provider } from 'react-redux'
import { store } from './store';



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
