import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Создание пула подключений
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Подключение к базе данных
pool.connect()
  .then(() => console.log('Подключение к базе данных успешно установлено'))
  .catch((err) => console.error('Ошибка подключения к базе данных:', err));

export default pool;