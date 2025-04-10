import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
const API_BASE_URL = 'http://localhost:8081';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(""); // Поле для ввода email
  const [password, setPassword] = useState(""); // Поле для ввода пароля

  // Функция для обработки входа
  const handleLogin = async () => {
    try {
      // Проверка на пустые поля
      if (!email.trim() || !password.trim()) {
        Alert.alert("Ошибка", "Пожалуйста, заполните все поля");
        return;
      }

      // Отправляем запрос на сервер
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Передаем email и пароль
      });

      const data = await response.json();

      // Обработка ответа от сервера
      if (response.ok) {
        Alert.alert("Успех", "Вы успешно вошли");
        navigation.navigate("Home"); // Переход на главную страницу
      } else {
        Alert.alert("Ошибка", data.error || "Неправильные данные");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Ошибка", "Не удалось подключиться к серверу");
    }
  };

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.title}>VitaCafe</Text>
      <Text style={styles.subtitle}>Добро пожаловать</Text>

      {/* Поле для ввода почты */}
      <TextInput
        placeholder="Почта"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" // Клавиатура для email
        autoCapitalize="none" // Отключение автозаглавных букв
        style={styles.input}
      />

      {/* Поле для ввода пароля */}
      <TextInput
        placeholder="Пароль"
        placeholderTextColor="#666"
        secureTextEntry // Скрытие вводимого текста
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Ссылка "Забыли пароль?" */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Забыли пароль?</Text>
      </TouchableOpacity>

      {/* Кнопка "Войти" */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>

      {/* Кнопка "Создать аккаунт" */}
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.createAccount}>Создать аккаунт</Text>
      </TouchableOpacity>
    </View>
  );
}

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 30,
    color: "#555",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#E6F0DA",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#78B420",
    marginBottom: 20,
    textDecorationLine: "underline", // Добавляем подчеркивание
  },
  button: {
    backgroundColor: "#78B420",
    paddingVertical: 10,
    paddingHorizontal: 110,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccount: {
    marginTop: 15,
    fontSize: 16,
    color: "#78B420",
    textDecorationLine: "underline", // Добавляем подчеркивание
  },
});