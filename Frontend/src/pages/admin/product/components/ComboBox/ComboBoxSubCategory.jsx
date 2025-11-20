import { useSubcategories } from "../../../hooks/useSubcategories.js";
import { useEffect } from "react";

const ComboBoxSubCategory = ({ name, value, onChange, apiUrlBase, idCategory }) => {
  const { subcategories, loadingSubcategories } = useSubcategories(apiUrlBase);

  // 🔹 Si no hay categoría seleccionada, no se muestran subcategorías
  const filteredSubcategories = idCategory
    ? subcategories.filter(
        (sub) => Number(sub.id_category) === Number(idCategory)
      )
    : [];

  if (loadingSubcategories) {
    return <p>Cargando subcategorías...</p>;
  }

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="combo__box-subcategories"
      disabled={!idCategory} // 🔹 Desactiva el combo si no hay categoría seleccionada
    >
      <option value="">
        {idCategory ? "Selecciona una subcategoría" : "Primero selecciona una categoría"}
      </option>

      {filteredSubcategories.length > 0 ? (
        filteredSubcategories.map((sub) => (
          <option key={sub.id_sub_category} value={sub.id_sub_category}>
            {sub.sub_category_name}
          </option>
        ))
      ) : (
        idCategory && <option disabled>No hay subcategorías disponibles</option>
      )}
    </select>
  );
};

export default ComboBoxSubCategory;
