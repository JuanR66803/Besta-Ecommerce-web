import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import SignUp from './pages/auth/sign-up/SignUp';
import PanelAdmin from './pages/admin/PanelAdmin';
import SignIn from './pages/auth/sign-in/SignIn';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home/Home';
import PublicRoute from './components/PublicRoute';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/sign-up' element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path='/sign-in' element={<PublicRoute><SignIn /></PublicRoute>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/panel-admin/*" element={<PanelAdmin />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);