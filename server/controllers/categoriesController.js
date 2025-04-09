import pool from "../models/db.js";

// Получение всех категорий
export const getCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Ошибка при получении категорий" });
  }
};