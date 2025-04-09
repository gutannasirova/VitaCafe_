import pool from "../models/db.js";

// Получение всех элементов меню
export const getMenuItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Ошибка при получении элементов меню" });
  }
};

// Создание нового элемента меню
export const createMenuItem = async (req, res) => {
  try {
    const { category_id, title, price, calories, image_url } = req.body;
    const result = await pool.query(
      'INSERT INTO menu_items (category_id, title, price, calories, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [category_id, title, price, calories, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Ошибка при создании элемента меню" });
  }
};

// Удаление элемента меню по ID
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM menu_items WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Элемент меню не найден" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Ошибка при удалении элемента меню" });
  }
};