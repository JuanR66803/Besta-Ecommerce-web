import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import SignUp from './pages/auth/sign-up/SignUp';
import PanelAdmin from './pages/admin/PanelAdmin';
import Cart from './pages/cart/cart';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/panel-admin/*' element={<PanelAdmin />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
  </BrowserRouter>
);