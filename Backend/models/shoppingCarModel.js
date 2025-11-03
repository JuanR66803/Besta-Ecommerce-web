import pool from "../config/db.js";

export class ShoppingCarModel {
  async createShoppingCarItem(
    id_product_details,
    quantity,
    id_shopping_cart,
    id_item_state
  ) {
    const query = `INSERT INTO shopping_cart_item(id_product_details, id_shopping_cart,id_item_state,quantity) VALUES ($1,$2,$3,$4)`;
    const result = await pool.query(query, [
      id_product_details,
      id_shopping_cart,
      id_item_state,
      quantity,
    ]);
    return result.rows[0];
  }

  async createShoppingCar(id_user, date, total_price) {
    const query = `
            INSERT INTO shopping_cart (id_user, modification_date, total_price)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
    const result = await pool.query(query, [id_user, date, total_price]);
    return result.rows[0];
  }
  async getAllProductCar(id_user) {
    try {
      const query = `
                SELECT
                    sci.id_shopping_cart_item, 
                    p.product_name,
                    p.url_image,
                    p.description,
                    pd.product_price,
                    pd.stock,
                    pd.product_size,
                    sci.quantity,
                    sc.total_price
                FROM 
                    shopping_cart_item AS sci 
                INNER JOIN 
                    shopping_cart AS sc ON sci.id_shopping_cart = sc.id_shopping_cart 
                INNER JOIN 
                    product_details AS pd ON sci.id_product_details = pd.id_product_details 
                INNER JOIN 
                    product AS p ON pd.id_product = p.id_product 
                WHERE 
                    sc.id_user = $1
            `;
      const result = await pool.query(query, [id_user]);
      return result.rows;
    } catch (error) {
      console.error("Error fetching product car:", error);
      throw new Error("Could not fetch cart items");
    }
  }
  async deleteCartItem(id_shopping_cart_item) {
    const query = `DELETE FROM shopping_cart_item WHERE id_shopping_cart_item = $1 RETURNING *;`;
    const result = await pool.query(query, [id_shopping_cart_item]);
    return result.rows[0];
  }
  async updateCartItemQuantity(id_shopping_cart_item, quantity) {
    const query = `
    UPDATE shopping_cart_item 
    SET quantity = $1
    WHERE id_shopping_cart_item = $2
    RETURNING *;
  `;
    const result = await pool.query(query, [quantity, id_shopping_cart_item]);
    return result.rows[0];
  }
}
