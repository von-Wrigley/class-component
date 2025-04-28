import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ControlledForm from './ControlledForm.tsx';
import UncontrolledForm from './UncontrolledForm.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/uncontrolform" element={<UncontrolledForm />} />
          <Route path="/controlform" element={<ControlledForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
