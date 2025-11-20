import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import ComboBoxCategory from "../ComboBox/ComboBoxCategory";
import { useSubcategories } from "../../../hooks/useSubcategories";

const ModalSubCategory = ({ onClose }) => {
  const API_URL_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
  const CREATE_URL = `${API_URL_BASE}/api/subCategory/createSubCategory`;

  // Hook personalizado para manejar subcategorías
  const { subcategories, setSubcategories, loadingSubcategories } =
    useSubcategories(API_URL_BASE);

  // Estados
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    sub_category_name: "",
    id_category: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "id_category" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  // Cerrar modal
  const handleCloseModal = () => {
    if (onClose) onClose();
  };

  // Crear nueva subcategoría
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.sub_category_name.trim())
      return alert("Debes escribir un nombre para la subcategoría");
    if (!formData.id_category)
      return alert("Debes seleccionar una categoría");

    setSubmitting(true);

    try {
      const res = await fetch(CREATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al guardar la subcategoría");
      }

      const data = await res.json();
      alert("Subcategoría agregada correctamente");

      const newSubcategory = data.subcategory || {
        id_sub_category: data.id_sub_category,
        sub_category_name: formData.sub_category_name,
        id_category: formData.id_category,
      };

      // Actualizar subcategorías global y filtradas
      setSubcategories((prev) => [...prev, newSubcategory]);

      if (formData.id_category === newSubcategory.id_category) {
        setFilteredSubcategories((prev) => [...prev, newSubcategory]);
      }

      // Limpiar formulario
      setFormData({ sub_category_name: "", id_category: "" });
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Filtrar subcategorías según categoría seleccionada
  useEffect(() => {
    if (!formData.id_category) {
      setFilteredSubcategories(subcategories);
      return;
    }

    const selectedId = Number(formData.id_category);
    if (Number.isNaN(selectedId)) {
      console.warn("id_category no es un número válido:", formData.id_category);
      setFilteredSubcategories([]);
      return;
    }

    const filtered = subcategories.filter(
      (sub) => Number(sub.id_category) === selectedId
    );

    setFilteredSubcategories(filtered);
  }, [formData.id_category, subcategories]);

  // Eliminar subcategoría
  const handleDelete = async (id) => {
    if (!id) return alert("El id de la subcategoría es obligatorio");

    const confirmDelete = confirm("¿Seguro que deseas eliminar esta subcategoría?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${API_URL_BASE}/api/subCategory/deleteSubCategoryById`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_sub_category: id }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al eliminar la subcategoría");
      }

      // Actualizar lista después de eliminar
      setSubcategories((prev) =>
        prev.filter((s) => s.id_sub_category !== id)
      );
      setFilteredSubcategories((prev) =>
        prev.filter((s) => s.id_sub_category !== id)
      );

      alert("Subcategoría eliminada correctamente");
    } catch (err) {
      console.error("Error al eliminar la subcategoría:", err);
      alert(err.message);
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <button className="btn__close-modal" onClick={handleCloseModal}>
          <MdOutlineCancel style={{ fontSize: "28px" }} />
        </button>

        <h3>Agrega una nueva sub categoría</h3>

        {/* Combo box modular (ya carga datos internamente) */}
        <ComboBoxCategory
          name="id_category"
          value={formData.id_category}
          onChange={handleChange}
          apiUrlBase={API_URL_BASE}
          
        />

        {/* Formulario */}
        <form className="input__category" onSubmit={handleSubmit}>
          <input
            name="sub_category_name"
            onChange={handleChange}
            value={formData.sub_category_name}
            type="text"
            placeholder="Digita el nombre de la sub categoría"
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

        {/* Tabla */}
        <table className="modal__table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loadingSubcategories ? (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Cargando subcategorías...
                </td>
              </tr>
            ) : filteredSubcategories.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No hay subcategorías registradas para esta categoría
                </td>
              </tr>
            ) : (
              filteredSubcategories.map((subcategory) => (
                <tr key={subcategory.id_sub_category}>
                  <td>{subcategory.sub_category_name}</td>
                  <td className="actions__cell">
                    <button className="btn__edit">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(subcategory.id_sub_category)
                      }
                      className="btn__delete"
                    >
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

export default ModalSubCategory;
