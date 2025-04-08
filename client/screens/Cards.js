import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CardsScreen() {
  const [selectedCard, setSelectedCard] = useState("Visa **3434");
  const [newCard, setNewCard] = useState({ number: "", exp: "", cvv: "" });
  const [showForm, setShowForm] = useState(false);
  const [cards, setCards] = useState(["Visa **3434", "MasterCard **3434"]);

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

  const handleAddCard = () => {
    const cardNumber = newCard.number.slice(-4); // Получаем последние 4 цифры номера карты
    const newCardLabel = `Карта **${cardNumber}`; // Форматируем номер карты
    setCards([...cards, newCardLabel]); // Добавляем новую карту в список
    setNewCard({ number: "", exp: "", cvv: "" }); // Сбрасываем форму
    setShowForm(false); // Скрываем форму
  };



  return (
    <ImageBackground source={require('./assets/fon.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Мои карты</Text>

        {/* Список карт */}
        {cards.map((card, index) => (
          <TouchableOpacity key={index} style={styles.cardItem} onPress={() => setSelectedCard(card)}>
            <Text style={styles.cardText}>{card}</Text>
            <View style={selectedCard === card ? styles.radioSelected : styles.radio} />
          </TouchableOpacity>
        ))}

        {/* Кнопка "Добавить карту" */}
        <TouchableOpacity
          style={styles.addCardButton}
          onPress={() => setShowForm(!showForm)}
        >
          <AntDesign name="pluscircleo" size={18} color="#4CAF50" style={styles.addCardIcon} />
          <Text style={styles.addCardText}>Добавить карту</Text>
        </TouchableOpacity>

        {/* Форма добавления карты */}
        {showForm && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Номер карты"
              keyboardType="numeric"
              value={newCard.number}
              onChangeText={(text) => setNewCard({ ...newCard, number: text })}
            />
            <View style={styles.row}>
              <TextInput
                style={styles.inputSmall}
                placeholder="мм/гг"
                keyboardType="numeric"
                value={newCard.exp}
                onChangeText={(text) => setNewCard({ ...newCard, exp: text })}
              />
              <TextInput
                style={styles.inputSmall}
                placeholder="cvv"
                keyboardType="numeric"
                value={newCard.cvv}
                onChangeText={(text) => setNewCard({ ...newCard, cvv: text })}
              />
            </View>

            {/* Кнопка Подтвердить */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleAddCard}>
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
    cardItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    cardText: {
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
    addCardButton: {
      flexDirection: 'row',
      backgroundColor: 'rgba(236, 244, 230, 0.9)',
      padding: 15,
      borderRadius: 20,
      marginTop: 20,
      height: 50,
    },
    addCardText: {
      fontSize: 16,
      marginLeft: 10,
      fontFamily: 'faberge',
      flexDirection: 'row',
      alignItems: 'center',
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