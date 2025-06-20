import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Animated
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function OrderScreen({ route }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [selectedAddress, setSelectedAddress] = useState(
    route.params?.selectedAddress || {
      city: "Москва",
      street: "ул Нежинская, д. 14"
    }
  );

  const totalPrice = route.params?.totalPrice ?? 0;
  const navigation = useNavigation();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground source={require("./assets/fon.png")} style={styles.background}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

        {/* Кнопка "Назад" */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>Оформление заказа</Text>

        {/* Адрес */}
        <View style={styles.section}>
          <FontAwesome5 name="map-marker-alt" size={18} color="black" />
          <Text style={styles.sectionTitle}>Адрес</Text>
        </View>
        <TouchableOpacity
          style={styles.inputRow}
          onPress={() => navigation.navigate("Addresses")}
        >
          <Text style={styles.inputText}>
            {selectedAddress.city}, {selectedAddress.street}
          </Text>
          <AntDesign name="right" size={18} color="black" />
        </TouchableOpacity>

        {/* Способ оплаты */}
        <View style={styles.section}>
          <FontAwesome5 name="credit-card" size={18} color="black" />
          <Text style={styles.sectionTitle}>Способ оплаты</Text>
        </View>
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setSelectedPayment("card")}
          >
            <Text style={styles.inputText}>Картой курьеру</Text>
            <View style={selectedPayment === "card" ? styles.radioSelected : styles.radio} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setSelectedPayment("cash")}
          >
            <Text style={styles.inputText}>Наличными</Text>
            <View style={selectedPayment === "cash" ? styles.radioSelected : styles.radio} />
          </TouchableOpacity>
        </View>

        

        {/* Итог */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Доставка: Бесплатно</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>Итог</Text>
          <Text style={styles.totalPrice}>{totalPrice}р</Text>
        </View>

        {/* Кнопка Заказать */}
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => navigation.navigate("OrderConfirmation")}
        >
          <Text style={styles.orderText}>Заказать</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: 412,
    height: 'auto',
    padding: 10,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
  },
  header: {
  fontSize: 26,
  paddingTop: 0,
  paddingBottom: 20,
  fontFamily: 'faberge',
  marginTop: 60,   // Добавил отступ сверху
  textAlign: 'left', // Чтобы заголовок был по центру
},

  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'faberge',
    marginLeft: 10,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  inputText: {
    fontSize: 16,
    fontFamily: "faberge",
  },
  paymentOptions: {
    marginTop: 10,
  },
  paymentOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  leaveAtDoor: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  leaveText: {
    fontSize: 16,
    fontFamily: 'faberge',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    backgroundColor: "#4CAF50",
  },
  summary: {
    marginTop: 15,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'faberge',
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: "transparent",
    paddingTop: 15,
    height: 90,
    width: 392,
    paddingHorizontal: 100,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#78B420",
    fontFamily: 'faberge',
    top: 430,
  },
  totalText: {
    fontSize: 16,
    fontFamily: 'faberge',
    right: 84,
  },
  totalPrice: {
    fontSize: 16,
    fontFamily: 'faberge',
    left: 84,
  },
  orderButton: {
    backgroundColor: "#78B420",
    paddingVertical: 10,
    paddingHorizontal: 102.5,
    borderRadius: 20,
    alignItems: "center",
    position: 'absolute',
    zIndex: 2,
    top: 490,
    width: 392,
  },
  orderText: {
    color: "white",
    fontSize: 18,
    fontFamily: 'faberge',
  },
});
