import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout.jsx';
import SignUp from './pages/auth/sign-up/SignUp';
import SignIn from './pages/auth/sign-in/SignIn';
import PanelAdmin from './pages/admin/PanelAdmin';
import Cart from './pages/cart/cart';
import Home from './pages/home/Home';
import Catalog from './pages/catalog/Catalog';
import Support from './pages/support/Soporte';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import Catalog from './pages/catalog/Catalog';
import Contact from './pages/contact/Contact';
import Principal from './pages/home/Principal';
import CheckoutPage from './pages/payment/CheckoutPage.jsx';

import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Rutas solo para invitados (no logueados) */}
          <Route path='/sign-up' element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path='/sign-in' element={<PublicRoute><SignIn /></PublicRoute>} />

          {/* Rutas Públicas que no necesitan protección */}
          <Route path='/catalogo' element={<Catalog />} />
          <Route path='/principal' element={<Principal />} />

          {/* Rutas Protegidas para usuarios logueados */}
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />

          {/* Rutas de usuario administrador */}
        
          <Route path="/" element={<Principal />} />
          {/*Rutas Publicas */}
          <Route path="/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/contacto" element={<Contact />} />
          {/*Rutas Protegidas */}
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          {/* <Route path="/contacto" element={<ProtectedRoute><catalog /></ProtectedRoute>} /> */}
          {/*Rutas Admin */}

          <Route element={<AdminRoute />}>
            <Route path='/panel-admin/' element={<PanelAdmin />} />
          </Route>

          <Route
            path="/checkout/payment-method"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

        </Route>
      </Routes>

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
        style={{ zIndex: 99999 }}
      />
    </AuthProvider>
  </BrowserRouter>
);
