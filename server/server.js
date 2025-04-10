import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import pg from "pg";
const { Pool } = pg;

const app = express();
const port = 3000;

// Настройка подключения к PostgreSQL
const pool = new Pool({
  user: "postgres", // Замените на имя пользователя PostgreSQL
  host: "localhost",
  database: "VitaCafe", // Замените на имя вашей базы данных
  password: "guti777", // Замените на пароль
  port: 5432,
});

// Middleware
app.use(cors({
  origin: 'http://localhost:8081', // Разрешаем запросы только с этого адреса
}));
app.use(express.json());

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
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );

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

// ==================== Запуск сервера ====================
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});