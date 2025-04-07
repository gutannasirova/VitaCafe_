const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres', // Замените на ваши учетные данные
  host: '127.0.0.1',
  database: 'VitaCafe',
  password: 'vitacafe',
  port: 5432,
});

// Получение всех категорий
const getCategories = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM categories ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

// Получение всех элементов меню
const getMenuItems = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM menu_items ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

// Создание нового элемента меню
const createMenuItem = (body) => {
  return new Promise((resolve, reject) => {
    const { category_id, title, price, calories, image_url } = body;
    pool.query(
      'INSERT INTO menu_items (category_id, title, price, calories, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [category_id, title, price, calories, image_url],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new menu item has been added: ${results.rows[0]}`);
      }
    );
  });
};

// Удаление элемента меню по ID
const deleteMenuItem = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM menu_items WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Menu item deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getCategories,
  getMenuItems,
  createMenuItem,
  deleteMenuItem,
};
