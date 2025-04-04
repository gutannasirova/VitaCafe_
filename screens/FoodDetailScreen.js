import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";


const FoodDetailScreen = () => {
  const [quantity, setQuantity] = useState(1); // Состояние для количества

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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

  return (
    <View style={styles.container}>
      {/* Фоновое изображение */}
      <Image source={require("./assets/fon.png")} style={styles.backgroundImage} />

      {/* Кнопка "Назад" */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>

      {/* Основной контент */}
      <View style={styles.content}>
        {/* Изображение блюда */}
        <Image
          source={require("./assets/dish.png")}
          style={styles.dishImage}
        />

        {/* Название блюда */}
        <Text style={styles.dishName}>Салат с бурраттой</Text>

        {/* Состав блюда */}
        <Text style={styles.sectionTitle}>Состав</Text>
        <Text style={styles.description}>
          Буррата - нежный итальянский сыр с тонкой оболочкой из моцареллы и кремовой начинкой из страчателлы и свежих сливок. Идеальное сочетание нежности сливочного вкуса и томатов.
        </Text>

        {/* Пищевая ценность */}
        <View style={styles.nutritionContainer}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>100</Text>
            <Text style={styles.nutritionUnit}>грамм</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>120</Text>
            <Text style={styles.nutritionUnit}>ккал</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>14.0</Text>
            <Text style={styles.nutritionUnit}>жиры</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>5.1</Text>
            <Text style={styles.nutritionUnit}>белки</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>10.0</Text>
            <Text style={styles.nutritionUnit}>углеводы</Text>
          </View>
        </View>

        {/* Кнопки управления количеством и "В корзину" */}
        <View style={styles.buttonsContainer}>
          {/* Кнопки + и - */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Кнопка "В корзину" */}
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>В корзину {quantity * 380}р</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Анимированные изображения */}
      <Animated.Image
        source={require("./assets/Bazelik.png")}
        style={[styles.Bazelik, { transform: [{ rotate: spin }] }]}
      />
      <Animated.Image
        source={require("./assets/Spinach2.png")}
        style={[styles.Spinach, { transform: [{ rotate: spin }] }]}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 20,
    color: "#333",
    fontFamily: "faberge",
  },
  content: {
    padding: 20,
    marginTop: 50,
  },
  dishName: {
    fontSize: 24,
    color: "#333",
    fontFamily: "faberge",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#333",
    fontFamily: "faberge",
  },
  description: {
    fontSize: 16,
    color: "#666",
    fontFamily: "faberge",
  },
  cartButton: {
    flex: 1,
    padding: 15,
    backgroundColor: "#77B502",
    borderRadius: 20,
    alignItems: "center",
    marginLeft: 20,
  },
  cartButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "faberge",
  }
});

export default FoodDetailScreen;
