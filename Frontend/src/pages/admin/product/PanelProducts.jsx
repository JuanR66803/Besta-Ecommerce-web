import "./PanelProducts.css";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import ModalProducts from "./components/modal-products/ModalProducts";
import { useGetProducts } from "../hooks/useGetProducts.js";
import { useDeleteProducts } from "../hooks/useUpdateStateProducts.js";
import ComboBoxCategory from "./components/ComboBox/ComboBoxCategory.jsx";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import { TbRadarOff } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";

const PanelProducts = () => {
    const API_URL_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
    const [query, setQuery] = useState("");
    const [openModalProduct, setOpenModalProduct] = useState(false);
    const [category, setCategory] = useState("");
    const [showInhabilitados, setShowInhabilitados] = useState(false);

    const { getProductsInhabilitados, getProducts, products, loading, error } = useGetProducts();
    // Se asume que useDeleteProducts provee reactivateProduct para habilitar
    const { disableProduct, enableProduct, loading: deleting, error: deleteError } = useDeleteProducts();

    useEffect(() => {
        const fetchProducts = async () => {
            if (showInhabilitados) {
                await getProductsInhabilitados();
            } else {
                await getProducts();
            }
        };
        fetchProducts();
    }, [showInhabilitados]);

    const toggleModal = () => {
        setOpenModalProduct((prev) => !prev);
    };

    const filteredProducts = products.filter((product) => {
        const matchesQuery = product.product_name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "" || product.id_category === Number(category);
        return matchesQuery && matchesCategory;
    });

    const toggleView = () => {
        setShowInhabilitados((prev) => !prev);
        setQuery("");
        setCategory("");
    };

    const handleAction = async (id, isCurrentlyInhabilitado) => {
        let success = false;
        let actionMessage = "";

        if (isCurrentlyInhabilitado) {
            const confirmReactivate = window.confirm("¿Estás seguro de que deseas habilitar este producto?");
            if (!confirmReactivate) return;
            success = await enableProduct(id);
            actionMessage = "Producto habilitado correctamente";
        } else {
            const confirmDelete = window.confirm("¿Estás seguro de que deseas inhabilitar este producto?");
            if (!confirmDelete) return;
            success = await disableProduct(id);
            actionMessage = "Producto inhabilitado correctamente";
        }

        if (success) {
            alert(actionMessage);
            if (showInhabilitados) {
                await getProductsInhabilitados();
            } else {
                await getProducts();
            }
        } else {
            alert(`Error al realizar la acción. ${deleteError || ""}`);
        }
    };

    return (
        <div className="panel__products">
            <section className="header__panel">
                <div className="text__header">
                    <h2 className="title__panel">Productos</h2>
                    <p>Gestiona tu catálogo de productos</p>
                </div>
                <button className="btn__ __add-product" onClick={toggleModal}>
                    Agregar Producto
                </button>
            </section>
            <section className="content__panel-products">
                <h3>Lista de Productos ({showInhabilitados ? "Inhabilitados" : "Habilitados"})</h3>
                <div className="filters__products">
                    <div className="filters__options">
                        <div className="search__product">
                            <CiSearch style={{ fontSize: "24px" }} />
                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                            />
                        </div>
                        {/* <div className="filter__category">
                            <ComboBoxCategory
                                className = "combo__box-category"
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                apiUrlBase={API_URL_BASE}
                            />
                        </div> */}
                        <button 
                            className="btn__toggle-view" 
                            title={showInhabilitados ? "Ver Productos Habilitados" : "Ver Productos Inhabilitados"}
                            onClick={toggleView}
                        >
                            {showInhabilitados ? <MdOutlineSecurity /> : <TbRadarOff />}
                        </button>
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
                            <th>Sub Categoría</th>
                            <th>Imagen</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="8">Cargando productos...</td>
                            </tr>
                        )}
                        {error && (
                            <tr>
                                <td colSpan="8">Error: {error}</td>
                            </tr>
                        )}
                        {!loading &&
                            !error &&
                            filteredProducts.map((product) => (
                                <tr key={product.id_product_details}>
                                    <td>{product.id_product_details}</td>
                                    <td>{product.product_name}</td>
                                    <td>{product.category_name}</td>
                                    <td>{product.sub_category_name}</td>
                                    <td>
                                        <img
                                            src={product.images[1]}
                                            alt={product.product_name}
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>{product.product_price}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <button title="Editar producto" className="btn__toggle-view"><FaEdit /></button>
                                        
                                        <button 
                                            title={showInhabilitados ? "Habilitar producto" : "Inhabilitar producto"} 
                                            className="btn__toggle-view"
                                            onClick={() => handleAction(product.id_product_details, showInhabilitados)}
                                        >
                                            {showInhabilitados ? <FaCheckCircle /> : <FaTrash />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
            {openModalProduct && <ModalProducts onClose={toggleModal} refreshTable={showInhabilitados ? getProductsInhabilitados : getProducts} />}
        </div>
    );
};

export default PanelProducts;