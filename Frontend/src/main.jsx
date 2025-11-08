import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import SignUp from './pages/auth/sign-up/SignUp';
import PanelAdmin from './pages/admin/PanelAdmin';
import Cart from './pages/cart/cart';
import SignIn from './pages/auth/sign-in/SignIn';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/home/Home';
import Catalog from './pages/catalog/Catalog';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/home' element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>
            <Route path='/panel-admin/*' element={<PanelAdmin />} />
            <Route path='/catalogo' element={<Catalog />} />
          </Route>
        </Routes>
    </AuthProvider>
  </BrowserRouter>
);