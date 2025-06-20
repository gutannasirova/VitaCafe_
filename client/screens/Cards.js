import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://localhost:3000"; // Замени на свой IP, если тестирование по Wi-Fi

export default function Cards({ route }) {
  const navigation = useNavigation();
  const { token, userId } = route.params || {};

useEffect(() => {
  if (!token) {
    Alert.alert("Ошибка", "Необходимо войти");
    return;
  }
  fetchCards();
}, [token]);

  const [cards, setCards] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    setLoading(true);
    fetch(`${API_URL}/getUserCards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    
      .then((res) => res.json())
      .then((data) => {
        setCards(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки карт:", err);
        setLoading(false);
      });
  };
  console.log("Токен:", token); // должен быть строкой вида "eyJhbGciOiJIUzI1NiIs..."

  const handleSelectCard = (index) => {
    setSelectedIndex(index);
  };

  const validateExp = (exp) => {
    return /^\d{2}\/\d{2}$/.test(exp);
  };

  const handleSaveCard = () => {
    if (!cardNumber.trim() || !exp.trim() || !cvv.trim()) {
      Alert.alert("Ошибка", "Введите номер карты, срок действия и CVV");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      Alert.alert("Ошибка", "Неверный формат номера карты");
      return;
    }

    if (!validateExp(exp)) {
      Alert.alert("Ошибка", "Формат срока действия должен быть MM/YY");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      Alert.alert("Ошибка", "Неверный формат CVV");
      return;
    }

    setSaving(true);
    fetch(`${API_URL}/addCard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        number: cardNumber,
        exp,
        cvv,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Ошибка сервера");
        }
        return res.json();
      })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setSelectedIndex(0);
        setCardNumber("");
        setExp("");
        setCvv("");
      })
      .catch((err) => {
        console.error("Ошибка при сохранении карты:", err);
        Alert.alert("Ошибка", "Не удалось сохранить карту");
      })
      .finally(() => setSaving(false));
  };

  const handleProceed = () => {
    if (selectedIndex === -1) {
      Alert.alert("Ошибка", "Пожалуйста, выберите карту");
      return;
    }
    navigation.navigate("Order", {
      selectedCard: cards[selectedIndex],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Выберите способ оплаты</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#78B420" />
      ) : (
        <>
          <ScrollView style={styles.cardList}>
            {cards.map((card, index) => (
              <TouchableOpacity
                key={card.id || index}
                style={styles.cardItem}
                onPress={() => handleSelectCard(index)}
              >
                <Text style={styles.cardText}>
                  **** **** **** {card.number.slice(-4)} ({card.exp})
                </Text>
                <View style={styles.radioOuter}>
                  {selectedIndex === index && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.title, { fontSize: 22 }]}>Добавить карту</Text>

          <TextInput
            placeholder="Номер карты"
            value={cardNumber}
            onChangeText={setCardNumber}
            style={styles.input}
            keyboardType="numeric"
            maxLength={16}
          />
          <TextInput
            placeholder="Срок действия (MM/YY)"
            value={exp}
            onChangeText={setExp}
            style={styles.input}
            maxLength={5}
          />
          <TextInput
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            style={styles.input}
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
          />

          <TouchableOpacity
            style={[styles.button, saving && { backgroundColor: "#999" }]}
            onPress={handleSaveCard}
            disabled={saving}
          >
            <Text style={styles.buttonText}>
              {saving ? "Сохраняем..." : "Сохранить карту"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={handleProceed}
          >
            <Text style={styles.buttonText}>Выбрать карту и продолжить</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cardText: {
    fontSize: 16,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#78B420",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#78B420",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#78B420",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});