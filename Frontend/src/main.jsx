import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
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
import Principal from './pages/home/Principal';
import Wishlist from './pages/wishlist/WishList'; 
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rutas solo para invitados (no logueados) */}
          <Route path="/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />
          
          {/* Rutas Públicas que no necesitan protección */}
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/principal" element={<Principal />} />
          
          {/* Rutas Protegidas para usuarios logueados */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          
          <Route 
            path="/wishlist" 
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            } 
          />

          {/* Rutas de usuario administrador */}
          <Route element={<AdminRoute />}>
            <Route path="/panel-admin" element={<PanelAdmin />} />
          </Route>
        </Route>
      </Routes>

      {/* ToastContainer para notificaciones globales */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 99999 }} // Asegurar que esté por encima del modal
      />
    </AuthProvider>
  </BrowserRouter>
);
