const express = require('express');
const cors = require('cors');
const menuModel = require('./queries'); // Импортируем функции из queries.js

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:8081' // Указываем адрес вашего клиента
}));

app.use(express.json());

// Получение всех категорий
app.get('/categories', async (req, res) => {
  try {
    const categories = await menuModel.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Ошибка при получении категорий" });
  }
});

// Получение всех элементов меню
app.get('/menu_items', async (req, res) => {
  try {
    const menuItems = await menuModel.getMenuItems();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Ошибка при получении элементов меню" });
  }
});

// Создание нового элемента меню
app.post('/menu_items', async (req, res) => {
  try {
    const newItem = await menuModel.createMenuItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Ошибка при создании элемента меню" });
  }
});

// Удаление элемента меню по ID
app.delete('/menu_items/:id', async (req, res) => {
  try {
    const result = await menuModel.deleteMenuItem(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Ошибка при удалении элемента меню" });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
