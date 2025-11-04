import "./PanelProducts.css";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import ModalProducts from "./components/modal-products/ModalProducts";
import { useGetProducts } from "../hooks/useGetProducts.js";
import { useDeleteProducts } from "../hooks/useDeleteProducts.js";
import ComboBoxCategory from "./components/ComboBox/ComboBoxCategory.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";

const PanelProducts = () => {
    const API_URL_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
    const [query, setQuery] = useState("");
    const [openModalProduct, setOpenModalProduct] = useState(false);
    const [category, setCategory] = useState(""); // Estado para la categoría seleccionada
    const { getProducts, products, loading, error } = useGetProducts();
    const { deleteProduct, loading: deleting, error: deleteError } = useDeleteProducts();

    useEffect(() => {
        const fetchProducts = async () => {
            await getProducts();
        };
        fetchProducts();
    }, []);

    const toggleModal = () => {
        setOpenModalProduct((prev) => !prev);
    };

    // Filtrar productos por búsqueda y categoría
    const filteredProducts = products.filter((product) => {
        const matchesQuery = product.product_name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "" || product.id_category === Number(category); // Convierte category a número
        return matchesQuery && matchesCategory;
    });

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmDelete) return;
        const success = await deleteProduct(id);
        if (success) {
            alert("Producto eliminado correctamente");
            await getProducts();
        } else {
            alert("Error al eliminar el producto");
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
                <h3>Lista de Productos</h3>
                <div className="filters__products">
                    <div className="filters__options">
                        <div className="search__product">
                            <CiSearch style={{ fontSize: "24px" }} />
                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="filter__category">
                            <ComboBoxCategory
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)} // Actualiza el estado de categoría
                                apiUrlBase={API_URL_BASE}
                            />
                        </div>
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
                                            src={product.url_image}
                                            alt={product.product_name}
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>{product.product_price}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <button className="btn__edit"><FaEdit /></button>
                                        <button className="btn__delete" onClick={() => handleDelete(product.id_product_details)}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
            {openModalProduct && <ModalProducts onClose={toggleModal} refreshTable={getProducts} />}
        </div>
    );
};

export default PanelProducts;
