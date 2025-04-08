import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

export default function RegistrationScreen() {
  // Логика анимации
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
        })
      ])
    ).start();
  }, []);

  // Интерполяция для вращения
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-50deg"],
  });

  return (
    <View style={styles.container}>
      {/* Вращающиеся листки салата */}
      <Animated.Image
        source={require('./assets/Bazelik.png')}
        style={[styles.Bazelik, { transform: [{ rotate: spin }] }]}
      />
      <Animated.Image
        source={require('./assets/Spinach2.png')}
        style={[styles.Spinach, { transform: [{ rotate: spin }] }]}
      />

      <Text style={styles.logo}>VitaCafe</Text>
      <Text style={styles.title}>Регистрация</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#333" style={styles.icon} />
        <TextInput placeholder="ФИО" style={styles.input} placeholderTextColor="#555" />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#333" style={styles.icon} />
        <TextInput placeholder="Почта" style={styles.input} placeholderTextColor="#555" />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#333" style={styles.icon} />
        <TextInput placeholder="Пароль" secureTextEntry style={styles.input} placeholderTextColor="#555" />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 412,
    height: 'auto',
    alignSelf: 'center',
    padding: 20,
    marginTop: 50,
  },
  backText: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'faberge',
  },
  logo: {
    fontSize: 33,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 70,
    fontFamily: 'faberge',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    padding:10,
    fontFamily: 'faberge',
    
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ecf4e6',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'faberge',
  },
  button: {
    backgroundColor: "#78B420",
    paddingVertical: 10,
    paddingHorizontal: 110,
    borderRadius: 20,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "faberge",
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
    top: "100%", // Центрирование по вертикали
    left: -20, // Левый край экрана
    width: 70,
    height: 70,
// Смещение вверх на половину высоты для точного центрирования
  },
});
