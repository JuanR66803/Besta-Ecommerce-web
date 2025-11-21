import "./PanelAdmin.css";
import { useState, useEffect } from "react";
import Dashboard from "./dashboard/Dashboard";
import PanelProducts from "./product/PanelProducts";
import PanelUsers from "./users/PanelUsers";
import PanelReports from "./reports/PanelReports";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUsers, FaBoxOpen, FaChartBar } from "react-icons/fa";


const PanelAdmin = () => {
    const [selectedOption, setSelectedOption] = useState("dashboard");
    return(
        <div className="panel__admin">
            <section className="admin__options">
                <div className="header__options">
                    <img src="/logo_fiera.png" alt="Logo fiera" />
                    <h2 className="title__options">Fiera Admin</h2>
                </div>
                <div className="options__list">
                    <button className={`btn__option ${selectedOption === "dashboard" ? "active" : ""}`} onClick={()=>setSelectedOption("dashboard")}> <MdOutlineSpaceDashboard style={{fontSize:"28px"}}/> Dashboard</button>
                    <button className={`btn__option ${selectedOption === "products" ? "active" : ""}`} onClick={()=>setSelectedOption("products")}><FaBoxOpen style={{fontSize:"28px"}}/>Productos</button>
                    <button className={`btn__option ${selectedOption === "users" ? "active" : ""}`} onClick={()=>setSelectedOption("users")}><FaUsers style={{fontSize:"28px"}}/>Usuarios</button>
                    <button className={`btn__option ${selectedOption === "reports" ? "active" : ""}`} onClick={()=>setSelectedOption("reports")}><FaChartBar style={{fontSize:"28px"}}/>Reportes</button>
                </div>
            </section>
            <section className="admin__content">
                    {selectedOption === "dashboard" && <Dashboard />}
                    {selectedOption === "products" && <PanelProducts />}
                    {selectedOption === "users" && <PanelUsers />}
                    {selectedOption === "reports" && <PanelReports />}
                
            </section>
        </div>
    )
}

export default PanelAdmin;
