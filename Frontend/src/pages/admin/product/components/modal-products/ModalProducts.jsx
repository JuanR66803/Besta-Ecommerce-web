import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import "./ModalProducts.css";

const API_URL = "https://tuapi.com/api/productos";

const ModalProducts = ({ onClose }) => {
  const [currentColor, setCurrentColor] = useState("#ff0000");
  const [colors, setColors] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    stock: "",
    description: "",
    category: "",
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
    const file = e.target.files && e.target.files[0];
    setImageFile(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...formData,
      colors,
      image: imageFile ? imageFile.name : null,
    };
    console.log("Payload a enviar:", payload);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...payload}),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al guardar el producto");
      }

      const data = await res.json();
      console.log("Producto guardado:", data);
      alert("Producto guardado correctamente");
      onClose && onClose();
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      alert(err.message);
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
          {/* Columna izquierda */}
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
              name="price"
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

            <label>Imagen</label>
            <input
              className="in__image"
              type="file"
              accept="image/*"
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

          {/* Columna derecha */}
          <section className="section__right-modal">
            <label>Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="categoria1">Categoría 1</option>
              <option value="categoria2">Categoría 2</option>
              <option value="categoria3">Categoría 3</option>
            </select>

            <label>Subcategoría</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una subcategoría</option>
              <option value="subcategoria1">Subcategoría 1</option>
              <option value="subcategoria2">Subcategoría 2</option>
              <option value="subcategoria3">Subcategoría 3</option>
            </select>

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

          {/* Botón Guardar abajo */}
          
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
    </div>
  );
};

export default ModalProducts;
