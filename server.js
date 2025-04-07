// server.js
const express = require('express');
const { getAllCategories, getAllMenuItems } = require('./queries');

const app = express();
const PORT = process.env.PORT || 3000;

// Определение маршрутов
app.get('/categories', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при получении категорий');
  }
});

app.get('/menu-items', async (req, res) => {
  try {
    const menuItems = await getAllMenuItems();
    res.json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при получении элементов меню');
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
