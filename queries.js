const pool = require('./database');

// Функция для получения всех категорий

const getAllCategories = async () => {
    try {
        const res = await pool.query('SELECT * FROM categories');
        return res.rows;  // Возвращаем массив строк
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
        throw error;  // Пробрасываем ошибку дальше
    }
};

// Функция для получения всех элементов меню
const getAllMenuItems = async () => {
    try {
        const res = await pool.query('SELECT * FROM menu_items');
        return res.rows;  // Возвращаем массив строк
    } catch (error) {
        console.error('Ошибка при получении элементов меню:', error);
        throw error;  // Пробрасываем ошибку дальше
    }
};

// Экспортируем функции для использования в других файлах
module.exports = {
    getAllCategories,
    getAllMenuItems,
};
