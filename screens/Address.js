import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function AddressesScreen() {
  const [selectedAddress, setSelectedAddress] = useState("ул. Ленина, 10");
  const [newAddress, setNewAddress] = useState({ street: "", house: "", apartment: "" });
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState(["ул. Ленина, 10", "пр. Мира, 25"]);

  // Анимация вращения
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

  // Интерполяция для вращения
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-50deg"],
  });

  const handleAddAddress = () => {
    const fullAddress = `${newAddress.street}, ${newAddress.house}${newAddress.apartment ? `, кв. ${newAddress.apartment}` : ''}`;
    setAddresses([...addresses, fullAddress]); // Добавляем новый адрес в список
    setNewAddress({ street: "", house: "", apartment: "" }); // Сбрасываем форму
    setShowForm(false); // Скрываем форму
  };

  return (
    <ImageBackground source={require('./assets/fon.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Мои адреса</Text>

        {/* Список адресов */}
        {addresses.map((address, index) => (
          <TouchableOpacity key={index} style={styles.addressItem} onPress={() => setSelectedAddress(address)}>
            <Text style={styles.addressText}>{address}</Text>
            <View style={selectedAddress === address ? styles.radioSelected : styles.radio} />
          </TouchableOpacity>
        ))}

        {/* Кнопка "Добавить адрес" */}
        <TouchableOpacity
          style={styles.addAddressButton}
          onPress={() => setShowForm(!showForm)}
        >
          <AntDesign name="pluscircleo" size={18} color="#4CAF50" style={styles.addCardIcon} />
          <Text style={styles.addAddressText}>Добавить адрес</Text>
        </TouchableOpacity>

        {/* Форма добавления адреса */}
        {showForm && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Улица"
              value={newAddress.street}
              onChangeText={(text) => setNewAddress({ ...newAddress, street: text })}
            />
            <View style={styles.row}>
              <TextInput
                style={styles.inputSmall}
                placeholder="Дом"
                keyboardType="numeric"
                value={newAddress.house}
                onChangeText={(text) => setNewAddress({ ...newAddress, house: text })}
              />
              <TextInput
                style={styles.inputSmall}
                placeholder="Квартира"
                keyboardType="numeric"
                value={newAddress.apartment}
                onChangeText={(text) => setNewAddress({ ...newAddress, apartment: text })}
              />
            </View>

            {/* Кнопка Подтвердить */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleAddAddress}>
              <Text style={styles.confirmText}>Подтвердить</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Анимированные изображения */}
        <Animated.Image
          source={require('./assets/Bazelik.png')}
          style={[styles.Bazelik, { transform: [{ rotate: spin }] }]}
        />
        <Animated.Image
          source={require('./assets/Spinach2.png')}
          style={[styles.Spinach, { transform: [{ rotate: spin }] }]}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: 412, // Изменено с 311 на 412
      height: 'auto',
      justifyContent: 'center',
    },
    container: {
      width: 412, // Изменено с 311 на 412
      height: 'auto',
      alignSelf: 'center',
      flexGrow: 1,
      padding: 20,
    },
    header: {
      fontSize: 26,
      paddingBottom: 20,
      fontFamily: 'faberge',
    },
    addressItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    addressText: {
      fontSize: 16,
      fontFamily: 'faberge',
      fontWeight: 'normal',
    },
    radio: {
      width: 18,
      height: 18,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#4CAF50',
    },
    radioSelected: {
      width: 18,
      height: 18,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#4CAF50',
      backgroundColor: '#4CAF50',
    },
    addAddressButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(236, 244, 230, 0.9)',
      padding: 15,
      borderRadius: 20,
      marginTop: 20,
    },
    addAddressText: {
      fontSize: 16,
      marginLeft: 10,
      fontFamily: 'faberge',
      fontWeight: 'normal',
    },
    addCardIcon: {
      marginLeft: 94, // Пропорционально увеличено с 48
    },
    input: {
      backgroundColor: 'rgba(236, 244, 230, 0.9)',
      padding: 15,
      borderRadius: 20,
      marginTop: 15,
      fontFamily: 'faberge',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    inputSmall: {
      backgroundColor: 'rgba(236, 244, 230, 0.9)',
      padding: 15,
      borderRadius: 20,
      width: '48%',
      fontFamily: 'faberge',
    },
    confirmButton: {
      backgroundColor: "#78B420",
      paddingVertical: 10,
      paddingHorizontal: 140, // Пропорционально увеличено с 110
      borderRadius: 20,
      marginTop: 30,
      alignItems: "center",
    },
    confirmText: {
      color: 'white',
      fontSize: 18,
      fontFamily: 'faberge',
      fontWeight: 'normal',
    },
    Bazelik: {
      position: "absolute",
      top: 500,
      left: 340, // Пропорционально изменено с 240
      width: 100,
      height: 100,
    },
    Spinach: {
      position: "absolute",
      top: 30,
      right: 380, // Пропорционально изменено с 280
      width: 60,
      height: 60,
    },
  });