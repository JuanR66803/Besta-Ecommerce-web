import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import SignUp from './auth/sign-up/SignUp';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/sign-up' element={<SignUp />} />
        </Route>
      </Routes>
  </BrowserRouter>
);