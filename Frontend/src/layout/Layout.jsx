import React from "react";
import "./layout.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { Outlet } from 'react-router-dom';
import BubbleMessage from "../pages/home/components/BubbleMessage";
import { ToastContainer } from 'react-toastify';
const Layout = () => {
    return (
      <div className="layout">
        <Header />
        <main className="layout-content">
          <Outlet />
          <BubbleMessage />
        </main>

        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    );
}

export default Layout;