import { useState } from "react";

export const useDeleteProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const disableProduct = async (productId) => {
    try {
      setLoading(true);
      const baseURL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${baseURL}/api/productDetails/disableProductDetailsById`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_product: productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el producto");
      }

      return true; // Indica éxito
    } catch (err) {
      console.error("Error en deleteProduct:", err);
      setError(err.message);
      return false; // Indica fallo
    } finally {
      setLoading(false);
    }
  };
  const enableProduct = async (productId) => {
    try {
      setLoading(true);
      const baseURL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseURL}/api/productDetails/enableProductDetailsById`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_product: productId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al reactivar el producto");
      }
      return true; // Indica éxito
    } catch (err) {
      console.error("Error en reactivateProduct:", err);
      setError(err.message);
      return false; // Indica fallo
    } finally {
      setLoading(false);
    }
  };

  return { enableProduct, disableProduct, loading, error };
};