import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
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

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rutas públicas */}
          <Route path="/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />

          {/* Rutas protegidas */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/catalogo" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
          <Route path="/carrito" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/soporte" element={<ProtectedRoute><Support /></ProtectedRoute>} />

          {/* Rutas para admin */}
          <Route path="/panel-admin/*" element={<AdminRoute><PanelAdmin /></AdminRoute>} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
