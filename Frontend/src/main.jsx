import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import SignUp from './pages/auth/sign-up/SignUp';
import PanelAdmin from './pages/admin/PanelAdmin';
import Catalog from './pages/catalog/Catalog';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/panel-admin/*" element={<PanelAdmin />} />
        <Route path="/catalog/*" element={<Catalog />} />
      </Route>
    </Routes>
  </BrowserRouter>
);