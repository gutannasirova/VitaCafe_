const pool = require('./database'); 

// Получение всех категорий
async function getCategories() {
  const result = await pool.query('SELECT * FROM categories');
  return result.rows;
}

// Получение всех пунктов меню
async function getMenuItems() {
  const result = await pool.query('SELECT * FROM menu_items');
  return result.rows;
}

// Создание нового элемента меню
async function createMenuItem(item) {
  const result = await pool.query(
    'INSERT INTO menu_items (category_id, title, price, calories, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [item.category_id, item.title, item.price, item.calories, item.image_url]
  );
  return result.rows[0];
}

// Удаление элемента меню по ID
async function deleteMenuItem(id) {
  const result = await pool.query('DELETE FROM menu_items WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
  getCategories,
  getMenuItems,
  createMenuItem,
  deleteMenuItem,
};
