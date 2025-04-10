import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";

// Замените на реальный URL вашего сервера
const API_BASE_URL = 'http://localhost:8081';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  // Функция для проверки валидности email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Функция для регистрации пользователя
  const handleSignUp = async () => {
    // Проверка ввода данных
    if (!name.trim()) {
      Alert.alert("Ошибка", "Введите ФИО");
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      Alert.alert("Ошибка", "Введите корректный email");
      return;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert("Ошибка", "Пароль должен содержать минимум 6 символов");
      return;
    }

    setIsLoading(true); // Включаем индикатор загрузки

    try {
      console.log("Отправляем запрос на:", `${API_BASE_URL}/register`);
      console.log("Данные для регистрации:", { username: name, email, password });

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка сервера:", errorData);
        Alert.alert("Ошибка", errorData.error || "Не удалось зарегистрироваться");
        return;
      }

      const data = await response.json();
      Alert.alert("Успех", "Вы успешно зарегистрировались");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      Alert.alert("Ошибка", "Не удалось подключиться к серверу. Проверьте подключение к интернету.");
    } finally {
      setIsLoading(false); // Выключаем индикатор загрузки
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>VitaCafe</Text>
      <Text style={styles.title}>Регистрация</Text>

      <TextInput
        placeholder="ФИО"
        placeholderTextColor="#555"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Почта"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none" // Отключаем автокапитализацию
      />

      <TextInput
        placeholder="Пароль"
        placeholderTextColor="#555"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        autoCapitalize="none" // Отключаем автокапитализацию
      />

      {/* Кнопка регистрации */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" /> // Индикатор загрузки
        ) : (
          <Text style={styles.buttonText}>Зарегистрироваться</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 33,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#ecf4e6",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#78B420",
    paddingVertical: 10,
    paddingHorizontal: 110,
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});