import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Импортируем Feather для стрелки
import { CartContext } from "../router/CartContext";

const CartScreen = ({ navigation }) => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  const increaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      if (item.quantity > 1) {
        updateQuantity(id, item.quantity - 1);
      } else {
        removeFromCart(id);
      }
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  return (
    <ImageBackground source={require("./assets/fon.png")} style={styles.background}>
      <View style={styles.container}>
        {/* Хедер с кнопкой "Назад" и логотипом */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.logo}>VitaCafe</Text>
        </View>

        <Text style={styles.headerText}>Выбрано вами</Text>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={item.image} style={styles.foodImage} />
              <View style={styles.textContainer}>
                <Text style={styles.foodTitle}>{item.title || "Без названия"}</Text>
                <Text style={styles.foodCalories}>{item.calories || ""}</Text>
                <Text style={styles.foodPrice}>
                  {item.price !== undefined ? `${item.price}р` : "0р"}
                </Text>
              </View>
              <View style={styles.counterContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.counterButton}>
                  <Text style={styles.counterText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity ?? 1}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.counterButton}>
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Корзина пуста</Text>
            </View>
          }
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Итого</Text>
          <Text style={styles.totalPrice}>{totalPrice}р</Text>
        </View>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => {
            if (cartItems.length > 0) {
              navigation.navigate("Order", { cartItems, totalPrice });
            }
          }}

          disabled={cartItems.length === 0}
        >
          <Text style={styles.orderText}>Заказать</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center", // выравнивание по вертикали
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  logo: {
    fontSize: 32, // Увеличенный шрифт
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#000",
    marginLeft: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#76b82a",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  foodImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  foodTitle: {
    fontSize: 18,
    color: "#fff",
  },
  foodCalories: {
    fontSize: 14,
    color: "#fff",
  },
  foodPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  counterButton: {
    paddingHorizontal: 10,
  },
  counterText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  separator: {
    height: 20,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderButton: {
    backgroundColor: "#76b82a",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  orderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
});

export default CartScreen;
