import "./PanelProducts.css";
import { CiSearch } from "react-icons/ci";
import { useState,useEffect } from "react";
import ModalProducts from "./components/modal-products/ModalProducts";

const PanelProducts = () => {
    const [query, setQuery] = useState("");
    const [openModalProduct, setOpenModalProduct] = useState(false);
    const [category, setCategory] = useState("");
    const categories = [
        { value: "", label: "Todas las categorías" },
        { value: "calzado", label: "Calzado" },
        { value: "ropa", label: "Ropa" },
        { value: "accesorios", label: "Accesorios" },
        { value: "equipamiento", label: "Equipamiento" }
    ];
    useEffect(() => {
        console.log("Buscar (state):", query);
    }, [query]);
    // toggle abre o cierra el modal
    const toggleModal = () => {
        setOpenModalProduct(prev => !prev);
    }
    return(
        <div className="panel__products">
            <section className="header__panel">
                <div className="text__header">
                    <h2 className="title__panel">Productos</h2>
                    <p>Gestiona tu catálogo de productos</p>
                </div>
                
                <button className="btn__ __add-product" onClick={toggleModal}>Agregar Producto</button>
            </section>
            <section className="content__panel-products">
                <h3>Lista de Productos</h3>
                <div className="filters__products">
                    <div className="filters__options">
                        <div className="search__product">
                        <CiSearch style={{fontSize:"24px"}}/>
                        <input type="text" placeholder="Buscar producto..." onChange={(e) => setQuery(e.target.value)} />
                    </div>
                    <select  
                        id="category" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select__category"
                        aria-label="Filtrar por categoria"
                    >
                        {categories.map((cat)=>(
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                    </div>
                    
                </div>
                
            </section>
            <section className="table__products">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aquí irán las filas de productos */}
                        </tbody>
                    </table>
                </section>
                {openModalProduct && <ModalProducts onClose={toggleModal} />}
            
        </div>
    )
}

export default PanelProducts;
