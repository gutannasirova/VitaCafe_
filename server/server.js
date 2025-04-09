import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:8081' // Указываем адрес вашего клиента
}));
app.use(express.json());

// Подключение маршрутов
app.use("/", routes);

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});