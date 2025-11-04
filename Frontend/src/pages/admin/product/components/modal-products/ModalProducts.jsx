import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import "./ModalProducts.css";
import { CiCirclePlus } from "react-icons/ci";
import ModalCategory from "../modal-categories/ModalCategory";
import ModalSubCategory from "../modal-categories/ModalSubcategory";
import ComboBoxCategory from "../ComboBox/ComboBoxCategory";
import ComboBoxSubCategory from "../ComboBox/ComboBoxSubCategory";



const ModalProducts = ({ onClose, refreshTable }) => {
  const API_URL_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
  const API_URL = `${API_URL_BASE}/api/productDetails/createProductDetails`;
  const [currentColor, setCurrentColor] = useState("#ff0000");
  const [colors, setColors] = useState([]);
  const [openModalCategory, setOpenModalCategory] = useState(false)
  const [openModalSubCategory, setOpenModalSubCategory] = useState(false);
  const [imageFiles, setImageFiles] = useState([]); // Cambiar a un array para múltiples imágenes
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    product_price: "",
    stock: "",
    description: "",
    category: "",
    state: "activo",
    subcategory: "",
    size: "",
    targetAudience: "",
    experienceLevel: "",
  });

  const handleCloseModal = () => {
    onClose && onClose();
  };

  const addColor = () => {
    if (!colors.includes(currentColor)) {
      setColors((prev) => [...prev, currentColor]);
    }
  };

  const removeColor = (color) => {
    setColors((prev) => prev.filter((c) => c !== color));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convertir FileList a un array
    setImageFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formPayload = new FormData();

    for (const key in formData) {
      formPayload.append(key, formData[key]);
    }

    formPayload.append("colors", JSON.stringify(colors));

    // Adjuntar múltiples imágenes
    imageFiles.forEach((file, index) => {
      formPayload.append(`images`, file); // El backend debe manejar el campo `images`
    });

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: formPayload,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Error al guardar el producto.");
      }

      console.log("Producto guardado:", data);
      alert("Producto guardado correctamente");
      refreshTable && refreshTable();
      onClose && onClose();
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      alert(err.message || "Ocurrió un error al guardar el producto.");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <button className="btn__close-modal" onClick={handleCloseModal}>
          <MdOutlineCancel style={{ fontSize: "28px" }} />
        </button>

        <form id="productForm" className="form__modal" onSubmit={handleSubmit}>
          <section className="section__left-modal">
            <h2>Agregar Nuevo Producto</h2>

            <label>Nombre del Producto</label>
            <input
              type="text"
              name="productName"
              placeholder="Nombre del producto"
              value={formData.productName}
              onChange={handleChange}
              required
            />

            <label>Precio</label>
            <input
              type="number"
              name="product_price"
              placeholder="Precio"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <label>Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />

            <label>Imágenes</label>
            <input
              className="in__image"
              type="file"
              accept="image/*"
              multiple // Permitir múltiples archivos
              onChange={handleFileChange}
            />

            <label>Descripción</label>
            <textarea
              name="description"
              placeholder="Descripción del producto"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </section>

          <section className="section__right-modal">
            <label>Categoría</label>
            <ComboBoxCategory
              name="category"
              value={formData.category}
              onChange={handleChange}
              apiUrlBase={API_URL_BASE}
            />
            <button
              type="button"
              onClick={() => setOpenModalCategory(true)}
              className="btn__category-more"
            >
              <CiCirclePlus style={{ fontSize: "28px" }} />
              <p>Agregar una nueva categoría</p>
            </button>

            <label>Subcategoría</label>
            <ComboBoxSubCategory
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              apiUrlBase={API_URL_BASE}
              idCategory={formData.category}
            />
            <button
              type="button"
              onClick={() => setOpenModalSubCategory(true)}
              className="btn__category-more"
            >
              <CiCirclePlus style={{ fontSize: "28px" }} />
              <p>Agregar una nueva subcategoría</p>
            </button>
            <label>Talla</label>
            <input
              type="text"
              name="size"
              placeholder="Ingrese la talla"
              value={formData.size}
              onChange={handleChange}
            />

            <label>Color</label>
            <div className="color-picker-row">
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                aria-label="Seleccionar color"
              />
              <button
                type="button"
                className="btn__add-color"
                onClick={addColor}
              >
                Agregar color
              </button>
            </div>

            <div className="selected-colors">
              {colors.map((col) => (
                <div key={col} className="color-swatch">
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      background: col,
                      borderRadius: 4,
                      border: "1px solid #ccc",
                    }}
                    title={col}
                  ></div>
                  <button
                    type="button"
                    onClick={() => removeColor(col)}
                    aria-label={`Eliminar color ${col}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <label>Objetivo Público</label>
            <select
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="child">Niño</option>
              <option value="adult">Adulto</option>
            </select>

            <label>Nivel de experiencia</label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="beginner">Amateur</option>
              <option value="professional">Profesional</option>
            </select>
          </section>
        </form>
        <div className="modal__footer">
          <button
            className="btn__submit"
            type="submit"
            disabled={submitting}
            form="productForm"
          >
            {submitting ? "Guardando..." : "Guardar Producto"}
          </button>
        </div>
      </div>
      {openModalCategory && (
        <ModalCategory onClose={() => setOpenModalCategory(false)} />
      )}

      {openModalSubCategory && (
        <ModalSubCategory onClose={() => setOpenModalSubCategory(false)} />
      )}
    </div>
  );
};

export default ModalProducts;