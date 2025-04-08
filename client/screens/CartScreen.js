import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([
        { id: "1", title: "Салат с бурратой", calories: "120 ккал", price: 380, quantity: 1, image: require("./assets/food_image2.png") },
        { id: "2", title: "Салат с бурратой", calories: "120 ккал", price: 380, quantity: 1, image: require("./assets/food_image2.png") },
        { id: "3", title: "Салат с бурратой", calories: "120 ккал", price: 380, quantity: 1, image: require("./assets/food_image2.png") },
        { id: "4", title: "Салат с бурратой", calories: "120 ккал", price: 380, quantity: 1, image: require("./assets/food_image2.png") },
    ]);

    const increaseQuantity = (id) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decreaseQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <ImageBackground source={require("./assets/fon.png")} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Feather name="menu" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.logo}>VitaCafe</Text>
                    <TouchableOpacity>
                        <Feather name="search" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerText}>Выбрано вами</Text>

                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Image source={item.image} style={styles.foodImage} />
                            <View style={styles.textContainer}>
                                <Text style={styles.foodTitle}>{item.title}</Text>
                                <Text style={styles.foodCalories}>{item.calories}</Text>
                                <Text style={styles.foodPrice}>{item.price}р</Text>
                            </View>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.counterButton}>
                                    <Text style={styles.counterText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantity}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.counterButton}>
                                    <Text style={styles.counterText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />

                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Итого</Text>
                    <Text style={styles.totalPrice}>{totalPrice}р</Text>
                </View>

                <TouchableOpacity style={styles.orderButton}>
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
        paddingBottom: 100, // Отступ, чтобы контент не скрывался за навигацией
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "serif",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
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
        marginBottom: 20, // Отступ от нижнего края
    },
    orderText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
});

export default CartScreen;
