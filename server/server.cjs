const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = 3000;

// Настройка подключения к PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "VitaCafe",
  password: "guti777",
  port: 5432,
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:8081", // Разрешаем запросы только с этого адреса
  })
);
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "assets")));

// ==================== Маршрут для регистрации ====================
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log("Полученные данные для регистрации:", { username, email });

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Пользователь с таким email уже существует" });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [
      username,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    console.error("Ошибка при регистрации:", error.message);
    res.status(500).json({ error: "Не удалось зарегистрировать пользователя" });
  }
});

// ==================== Маршрут для входа ====================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ищем пользователя по email
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    // Проверяем пароль
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ error: "Неверный пароль" });
    }

    res.status(200).json({ message: "Вход выполнен успешно" });
  } catch (error) {
    console.error("Ошибка при входе:", error.message);
    res.status(500).json({ error: "Ошибка при выполнении входа" });
  }
});

// ==================== Маршрут для получения категорий ====================
app.get("/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Ошибка при загрузке категорий:", error.message);
    res.status(500).json({ error: "Не удалось загрузить категории" });
  }
});

// ==================== Маршрут для получения элементов меню ====================
app.get("/menu_items", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM menu_items");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Ошибка при загрузке элементов меню:", error.message);
    res.status(500).json({ error: "Не удалось загрузить элементы меню" });
  }
});

// ==================== Маршрут для добавления товара в корзину ====================
app.post("/cart", async (req, res) => {
  const { id, title, calories, price, quantity, image } = req.body;

  try {
    await pool.query(
      "INSERT INTO cart_items (id, title, calories, price, quantity, image) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, title, calories, price, quantity, image]
    );
    res.status(201).json({ message: "Товар добавлен в корзину" });
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error.message);
    res.status(500).json({ error: "Ошибка при добавлении товара" });
  }
});

// ==================== Маршрут для получения адресов пользователя ====================
app.post('/addAddress', async (req, res) => {
  const { user_id, city, street } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO addresses (user_id, city, street) VALUES ($1, $2, $3) RETURNING *",
      [user_id, city, street]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка добавления адреса:", error.message);
    res.status(500).json({ error: "Ошибка добавления адреса" });
  }
});

app.get("/getUserAddresses", async (req, res) => {
  const userId = req.query.user_id;
  try {
    const result = await pool.query(
      "SELECT * FROM addresses WHERE user_id = $1",
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении адресов:", error.message);
    res.status(500).json({ error: "Не удалось загрузить адреса" });
  }
});
// ==================== Запуск сервера ====================
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
