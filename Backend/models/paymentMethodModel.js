import pool from "../config/db.js"

export class PaymentMethodModel {

    // Crear método de pago
    async createPaymentMethod(method_name) {
        const query = `INSERT INTO payment_method(method_name) VALUES($1) RETURNING *`;
        const values = [method_name];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Actualizar método de pago
    async updatePaymentMethodById(id_payment_method, method_name) {
        const query = "UPDATE payment_method SET method_name=$2 WHERE id_payment_method=$1 RETURNING *";
        const values = [id_payment_method, method_name];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Eliminar método de pago
    async deletePaymentMethodById(id_payment_method) {
        const query = `DELETE FROM payment_method WHERE id_payment_method= $1 RETURNING *`;
        const result = await pool.query(query, [id_payment_method]);
        return result.rows[0];
    }

    // Obtener por ID
    async getPaymentMethodById(id_payment_method) {
        const query = `SELECT * FROM payment_method WHERE id_payment_method= $1`;
        const result = await pool.query(query, [id_payment_method]);
        return result.rows[0];
    }

    // Obtener todos
    async getAllPaymentMethods() {
        const query = `SELECT * FROM payment_method`;
        const result = await pool.query(query);
        return result.rows;
    }
}
