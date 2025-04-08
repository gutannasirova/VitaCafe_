import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Keyboard } from "react-native";

const PinCodeScreen = ({ navigation }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (pin.every((digit) => digit !== "")) {
      // Переход на главную страницу после ввода всех цифр
      navigation.navigate("Home");
    }
  }, [pin, navigation]);

  const handleChangeText = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    // Автоматический переход к следующему полю
    if (text !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {/* Название "VitaCafe" */}
      <Text style={styles.header}>VitaCafe</Text>

      {/* Блок с PIN-кодом */}
      <View style={styles.content}>
        <Text style={styles.title}>Введите 4 цифры из СМС</Text>
        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)} // Установка ref для каждого поля
              style={styles.pinInput}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onFocus={() => Keyboard.dismiss()} // Закрытие клавиатуры при фокусировке на поле
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFFFA",
    width: 412,
    height: 'auto',
  },
  header: {
    fontSize: 34,
    fontFamily: "Faberge",
    fontFamily: "serif",
    textAlign: "center",
    marginTop: 250, // Отступ сверху для названия
    marginBottom: 20, // Отступ снизу для названия
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Faberge",
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10, // Расстояние между полями ввода
  },
  pinInput: {
    width: 50,
    height: 50,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#76b82a",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Faberge",
  },
});

export default PinCodeScreen;
