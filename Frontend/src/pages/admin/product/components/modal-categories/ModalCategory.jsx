import { useState, useEffect } from "react";
import "./ModalSubandCategory.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const ModalCategory = ({ onClose }) => {
    const API_URL_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
    const CREATE_URL = `${API_URL_BASE}/api/category/createCategory`;
    const GET_ALL_URL = `${API_URL_BASE}/api/category/getAllCategories`;
    const DELETE_URL = `${API_URL_BASE}/api/category/deleteCategoryById`;

    const [formData, setFormData] = useState({
        category_name: "",
    });

    const [categories, setCategories] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // 🔹 Obtener categorías al montar el componente
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(GET_ALL_URL);
                if (!res.ok) throw new Error("Error al obtener las categorías");

                const data = await res.json();
                console.log("Categorías cargadas:", data);
                setCategories(data); // ✅ ya es un array directo
            } catch (err) {
                console.error(err);
                alert("No se pudieron cargar las categorías");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);


    // 🔹 Manejar cambios en el input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 🔹 Cerrar modal
    const handleCloseModal = () => {
        onClose && onClose();
    };

    // 🔹 Crear nueva categoría
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.category_name.trim()) return alert("Debes escribir un nombre");

        setSubmitting(true);
        const formPayload = new FormData();

        for (const key in formData) {
            formPayload.append(key, formData[key]);
        }

        try {
            const res = await fetch(CREATE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Error al guardar la categoría");
            }

            const data = await res.json();
            alert("Categoría agregada correctamente");

            // 🔹 Refrescar lista sin recargar
            setCategories((prev) => [...prev, data.category || formData]);
            setFormData({ category_name: "" }); // limpiar input
        } catch (err) {
            console.error("Error al enviar el formulario:", err);
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    };
    const handleDelete = async (id_category) => {
        if (!confirm("¿Seguro que deseas eliminar esta categoria?")) return;
        try {
            const res = await fetch(DELETE_URL, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_category }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Error al eliminar esta categoria");
            }
            alert("Categoria eliminada correctamente");

            setCategories((prev) =>
                prev.filter((cat) => cat.id_category !== id_category)
            );
        } catch (err) {
            console.error("Erro al eliminar la categoria", err);
            alert(err.message)
        }
    };

    return (
        <div className="modal__overlay">
            <div className="modal__content">
                <button className="btn__close-modal" onClick={handleCloseModal}>
                    <MdOutlineCancel style={{ fontSize: "28px" }} />
                </button>
                <h3>Agrega una nueva categoría</h3>

                <form className="input__category" onSubmit={handleSubmit}>
                    <input
                        name="category_name"
                        onChange={handleChange}
                        value={formData.category_name}
                        type="text"
                        placeholder="Digita el nombre de la categoría"
                        className="modal__input"
                    />
                    <button
                        type="submit"
                        className="btn__add-category"
                        disabled={submitting}
                    >
                        {submitting ? "Guardando..." : "Agregar"}
                    </button>
                </form>

                <table className="modal__table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="2" style={{ textAlign: "center" }}>
                                    Cargando categorías...
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan="2" style={{ textAlign: "center" }}>
                                    No hay categorías registradas
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category.id || category.category_id}>
                                    <td>{category.name || category.category_name}</td>
                                    <td className="actions__cell">
                                        <button className="btn__edit">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(category.id_category)} className="btn__delete">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ModalCategory;


