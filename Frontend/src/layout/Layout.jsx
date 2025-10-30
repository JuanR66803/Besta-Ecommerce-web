import React from "react";
import "./layout.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { Outlet } from 'react-router-dom';
import BubbleMessage from "../components/BubbleMessage";
const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <main className="layout-content">
                <Outlet />
                <BubbleMessage />
            </main>
            
            <Footer />
            
        </div>
    )
}

export default Layout;