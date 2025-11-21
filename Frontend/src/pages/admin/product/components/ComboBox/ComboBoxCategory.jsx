import { useCategories } from "../../../hooks/useCategories.js";
const ComboBoxCategory = ({ name, value, onChange, apiUrlBase }) => {
    const { categories, loadingCategories } = useCategories(apiUrlBase);

    if (loadingCategories) return <p>Cargando categorías...</p>;

    return (
        <select
            name={name} // 👈 necesario para que el handleChange del padre sepa qué campo cambiar
            value={value}
            onChange={onChange}
            className="combo__box-categories"
        >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
                <option key={category.id_category} value={category.id_category}>
                    {category.category_name}
                </option>
            ))}
        </select>
    );
};

export default ComboBoxCategory;
