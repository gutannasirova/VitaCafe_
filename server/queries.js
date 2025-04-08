const pool = require('../database'); 

// Получение всех категорий
async function getAllCategories() {
  const result = await pool.query('SELECT * FROM categories');
  return result.rows;
}

// Получение всех пунктов меню
async function getAllMenuItems() {
  const result = await pool.query('SELECT * FROM menu_items');
  return result.rows;
}

module.exports = {
  getAllCategories,
  getAllMenuItems,
};
