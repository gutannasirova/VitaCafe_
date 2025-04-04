import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Animated } from "react-native";

const PasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 4000, // Вращение на 180 градусов за 4 секунды
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 4000, // Возвращение обратно за 4 секунды
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Интерполяция для вращения (только 180 градусов вперед-назад)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-50deg"],
  });

  const handleSave = () => {
    // Логика для сохранения пароля
    if (newPassword === repeatPassword) {
      console.log("Пароль успешно сохранен");
    } else {
      console.log("Пароли не совпадают");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Заголовок "VitaCafe" */}
        <Text style={styles.header}>VitaCafe</Text>

        {/* Заголовок "Придумайте новый пароль" */}
        <Text style={styles.title}>Придумайте новый пароль</Text>

        {/* Поле для нового пароля */}
        <TextInput
          style={styles.input}
          placeholder="Новый пароль"
          placeholderTextColor="#999"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        {/* Поле для повторения пароля */}
        <TextInput
          style={styles.input}
          placeholder="Повторите пароль"
          placeholderTextColor="#999"
          secureTextEntry
          value={repeatPassword}
          onChangeText={setRepeatPassword}
        />

        {/* Кнопка "Сохранить" */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>

      {/* Изображение Bazelik */}
      <Animated.Image
        source={require("./assets/Bazelik.png")}
        style={[styles.Bazelik, { transform: [{ rotate: spin }] }]}
      />

      {/* Изображение Spinach */}
      <Animated.Image
        source={require("./assets/Spinach2.png")}
        style={[styles.Spinach, { transform: [{ rotate: spin }] }]}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFFFA", // Цвет фона
    justifyContent: "center",
    paddingHorizontal: 10,
    width:412,
    height: 'auto',
  },
  content: {
    alignItems: "center",
  },
  header: {
    fontSize: 34,
    fontFamily: "Faberge", // Заменено на Faberge
    color: "#333",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: "Faberge", // Заменено на Faberge
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#D9EAC9", // Цвет фона для полей
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    fontFamily: "Faberge", // Заменено на Faberge
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#77B502", // Цвет кнопки "Сохранить"
    borderRadius: 20, // Округление на 20 пикселей
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Faberge", // Заменено на Faberge
  },
  Bazelik: {
    position: "absolute",
    top: "20%", // Центрирование по вертикали
    right: -32, // Правый край экрана
    width: 90,
    height: 90,
    marginTop: -45, // Смещение вверх на половину высоты для точного центрирования
  },
  Spinach: {
    position: "absolute",
    top: "80%", // Центрирование по вертикали
    left: -20, // Левый край экрана
    width: 70,
    height: 70,
// Смещение вверх на половину высоты для точного центрирования
  },
});

export default PasswordScreen;
