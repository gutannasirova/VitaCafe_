import React, { useState, useRef, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { CartContext } from '../router/CartContext';


const FoodDetailScreen = ({ navigation }) => {
  const { addToCart } = useContext(CartContext); // Достаём функцию addToCart
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const newItem = {
      id: "1", // id товара (можно сгенерировать динамически или задать уникальный)
      title: "Салат с бурраттой",
      calories: "120 ккал",
      price: 380,
      quantity: quantity,
      image: require("./assets/food_image2.png"),
    };
    addToCart(newItem);
    navigation.navigate("Cart");
  };


  // Анимация вращения
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);




  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };




  return (
    <View style={styles.container}>
      <Image source={require("./assets/fon.png")} style={styles.backgroundImage} />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Image source={require("./assets/dish.png")} style={styles.dishImage} />
        <Text style={styles.dishName}>Салат с бурраттой</Text>
        <Text style={styles.sectionTitle}>Состав</Text>
        <Text style={styles.description}>
          Буррата - нежный итальянский сыр с тонкой оболочкой из моцареллы и кремовой начинкой из страчателлы и свежих сливок.
        </Text>

        <View style={styles.buttonsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.cartButtonText}>В корзину {quantity * 380}р</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cartButton: {
    backgroundColor: "#77B502",
    borderRadius: 20,
    marginLeft: 0,
    alignItems: "center",
    marginTop: 20, // Add some space above the button
    width: "100%", // Limit width so the button doesn't stretch too much
  },
  cartButtonText: {
    fontSize: 16,
    color: "#fff",
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
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 36,
    color: "#333",
  },
  content: {
    paddingTop: 50, // Increased margin for better spacing
    marginBottom: 40, // Adding space at the bottom
    alignItems: "center",
  },
  dishName: {
    fontSize: 24,
    color: "#333",
    marginBottom: 20, // Adding space between name and section

  },
  sectionTitle: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10, // Adding space

  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20, // Adding space below the description
    textAlign: "center", // Center the description text
  },
  cartButton: {
    flex: 1,
    padding: 25,
    backgroundColor: "#77B502",
    borderRadius: 20,
    alignItems: "center",
  },
  cartButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  buttonsContainer: {
    width: "100%", // Ensuring it takes up full width
    alignItems: "center", // Center content inside the container
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30, // Adding space between quantity controls and cart button
  },
  quantityButton: {
    padding: 15,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginHorizontal: 20, // Adding space between the buttons
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
});

export default FoodDetailScreen;