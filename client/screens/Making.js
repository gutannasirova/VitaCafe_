import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Animated } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function OrderScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [promoCode, setPromoCode] = useState("");
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("В ближайший час");
  const [showDatePicker, setShowDatePicker] = useState(false);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleOptions = () => setShowOptions(!showOptions);


  
  return (
    <ImageBackground source={require("./assets/fon.png")} style={styles.background}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.header}>Оформление заказа</Text>

        {/* Адрес */}
        <View style={styles.section}>
          <FontAwesome5 name="map-marker-alt" size={18} color="black" />
          <Text style={styles.sectionTitle}>Адрес</Text>
        </View>
        <TouchableOpacity style={styles.inputRow}>
          <Text style={styles.inputText}>Москва, ул Нежинская, дом 14</Text>
          <AntDesign name="right" size={18} color="black" />
        </TouchableOpacity>



        {/* Способ оплаты */}
        <View style={styles.section}>
          <FontAwesome5 name="credit-card" size={18} color="black" />
          <Text style={styles.sectionTitle}>Способ оплаты</Text>
        </View>
        <TouchableOpacity style={styles.inputRow}>
          <Text style={styles.inputText}>Оплата картой ***4433</Text>
          <AntDesign name="right" size={18} color="black" />
        </TouchableOpacity>

        {/* Бонусы */}
        <View style={styles.section}>
          <FontAwesome5 name="gift" size={18} color="black" />
          <Text style={styles.sectionTitle}>Бонусы</Text>
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.bonusInput}
            placeholder="Количество бонусов"
            value={promoCode}
            onChangeText={setPromoCode}
            placeholderTextColor="#6A6A6A"
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Списать</Text>
          </TouchableOpacity>
        </View>

        {/* Оставить у двери */}
        <TouchableOpacity style={styles.leaveAtDoor} onPress={() => setLeaveAtDoor(!leaveAtDoor)}>
          <Text style={styles.leaveText}>Оставить у двери</Text>
          <View style={leaveAtDoor ? styles.radioSelected : styles.radio} />
        </TouchableOpacity>

        {/* Итог */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Доставка: Бесплатно</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>Итог</Text>
          <Text style={styles.totalPrice}>1288р</Text>
        </View>

        {/* Кнопка Заказать */}
        <TouchableOpacity style={styles.orderButton}>
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
    width: 412, // ширина теперь адаптивная
    height: 'auto', // высота адаптируется под содержимое
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
  dropdown: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 10,
    marginTop: 5,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "faberge",
  },
  selectedOption: {
    backgroundColor: "#7bc100",
    borderRadius: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  bonusInput: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
    width: 392, // теперь занимает 85% доступной ширины
    borderRadius: 20,
    marginRight: 10,
    fontFamily: 'faberge',
    position: 'absolute',
    zIndex: 1,
  },
  applyButton: {
    backgroundColor: "#6B9D19",
    padding: 14.5,
    borderRadius: 20,
    alignItems: "center",
    marginLeft: 'auto', // позиционируем кнопку вправо
    marginRight: 0,
    width: 100, // фиксированная ширина кнопки
    zIndex: 2,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#78B420",
  },
  applyButtonText: {
    color: "#000000",
    fontSize: 14,
    fontFamily: 'faberge',
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
    width:392,
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
    width:392,
  },
  orderText: {
    color: "white",
    fontSize: 18,
    fontFamily: 'faberge',
  },
});

