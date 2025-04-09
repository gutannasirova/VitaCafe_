import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Импортируем необходимые модули
import App from "./App"; // Импортируем ваш основной компонент

// Создаем экземпляр QueryClient
const queryClient = new QueryClient();

// Рендерим приложение с QueryClientProvider
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);