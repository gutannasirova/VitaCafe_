const express = require('express');
const menuModel = require('./menu_model');
const cors = require('cors');

const app = express();
const port = 3000; // сервер теперь будет слушать на порту 5000

// Используем CORS для разрешения запросов с клиента
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Получение всех категорий
app.get('/categories', (req, res) => {
  menuModel.getCategories()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.error("Error fetching categories:", error);
      res.status(500).send({ error: "Ошибка при получении категорий" });
    });
});

// Получение всех элементов меню
app.get('/menu_items', (req, res) => {
  menuModel.getMenuItems()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.error("Error fetching menu items:", error);
      res.status(500).send({ error: "Ошибка при получении элементов меню" });
    });
});

// Создание нового элемента меню
app.post('/menu_items', (req, res) => {
  menuModel.createMenuItem(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(error => {
      console.error("Error creating menu item:", error);
      res.status(500).send({ error: "Ошибка при создании элемента меню" });
    });
});

// Удаление элемента меню по ID
app.delete('/menu_items/:id', (req, res) => {
  menuModel.deleteMenuItem(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.error("Error deleting menu item:", error);
      res.status(500).send({ error: "Ошибка при удалении элемента меню" });
    });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
