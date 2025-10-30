import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx'; // ajusta la ruta según tu proyecto

export const useCartItem = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addToCart = async (product) => {
        if (!user || !user.id_users) {
            setError('Debes iniciar sesión para añadir productos al carrito');
            console.warn("No hay usuario logueado, cancelando petición.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const body = {
                id_product_details: product.id,
                quantity: 1,
                id_user: user.id_users,
                price: product.price,
            };

            const baseURL = import.meta.env.VITE_API_URL;

            if (!baseURL) {
                throw new Error("VITE_API_URL no está definida. Verifica tu archivo .env");
            }

            const url = `${baseURL}/api/shoppingCar/addCar`;

            // --- Ejecución del fetch ---
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = text;
            }

            if (!response.ok) {
                console.error("❗ Error HTTP:", response.status, data);
                throw new Error(data.message || 'Error al agregar al carrito');
            }

            alert("producto agregado al carrito")
            return data;

        } catch (err) {
            console.error("Error en addToCart:", err);
            setError(err.message);
        } finally {
            setLoading(false);
            console.log("Estado loading:", false);
        }
    };

    

    return { addToCart, loading, error };
};
