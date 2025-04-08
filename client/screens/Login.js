import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Animated } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('Иван');
  const [surname, setSurname] = useState('Иванов');
  const [email, setEmail] = useState('ivan@mail.com');
  const [avatar, setAvatar] = useState(null);

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

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && response.assets) {
        setAvatar(response.assets[0].uri);
      }
    });
  };

  const handleLogout = () => {
    console.log('User logged out');
    navigation.navigate('Login'); // Переход на экран входа
  };

  return (
    <ImageBackground source={require('./assets/fon.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Личный кабинет</Text>

        {/* Вращающиеся листки салата */}
        <Animated.Image
          source={require('./assets/Bazelik.png')}
          style={[styles.Bazelik, { transform: [{ rotate: spin }] }]}
        />
        <Animated.Image
          source={require('./assets/Spinach2.png')}
          style={[styles.Spinach, { transform: [{ rotate: spin }] }]}
        />

        <TouchableOpacity onPress={handleImagePick}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>Добавить фото</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}value={name}
          onChangeText={setName}
          placeholder="Имя"
          placeholderTextColor="#6A6A6A" // Серый цвет
        />
        <TextInput
          style={styles.input}
          value={surname}
          onChangeText={setSurname}
          placeholder="Фамилия"
          placeholderTextColor="#6A6A6A" // Серый цвет
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Почта"
          placeholderTextColor="#6A6A6A" // Серый цвет
          keyboardType="email-address"
        />

        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Выйти</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
background: {
    flex: 1,
    width: 412,
    height: 'auto',
    justifyContent: 'center',
},
container: {
    flexGrow: 1,
    padding: 20,

},
title: {
    marginBottom: 20,
    textAlign: 'left',
    fontSize: 26,
    paddingBottom: 20,
    fontFamily: 'faberge',
},
input: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingLeft: 20,
    borderRadius: 20,
    width: '100%',
    fontFamily: 'faberge',
},
avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
},
avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
},
avatarText: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'faberge',
},
label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: '#fff',
    fontFamily: 'faberge',
},
text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#6A6A6A',
    fontFamily: 'faberge',
},
button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    
},
buttonText: {
    fontSize: 18,
    color: '#f44336',
    fontFamily: 'faberge',
},
Bazelik: {
    position: "absolute",
    top: "17%", // Центрирование по вертикали
    right: -30, // Правый край экрана
    width: 90,
    height: 90,
    marginTop: -25, // Смещение вверх на половину высоты для точного центрирования
},
Spinach: {
    position: "absolute",
    top: "80%", // Центрирование по вертикали
    left: -20, // Левый край экрана
    width: 70,
    height: 70,
    marginTop: -25, // Смещение вверх на половину высоты для точного центрирования
},
  
});

export default ProfileScreen;
