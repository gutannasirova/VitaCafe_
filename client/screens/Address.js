import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AddressScreen({ route }) {
  const navigation = useNavigation();
  const userId = route.params?.userId || 1;

  const [addresses, setAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = () => {
    setLoading(true);
fetch(`http://localhost:3000/getUserAddresses?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAddresses(data);
        } else if (data && Array.isArray(data.addresses)) {
          setAddresses(data.addresses);
        } else {
          setAddresses([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки адресов:", err);
        setLoading(false);
      });
  };

  const handleSelectAddress = (index) => {
    setSelectedIndex(index);
  };

  const handleSaveAddress = () => {
    if (!city.trim() || !street.trim()) {
      Alert.alert("Ошибка", "Пожалуйста, заполните город и улицу");
      return;
    }
    setSaving(true);
    fetch("http://localhost:3000/addAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, city, street }),
    })
      .then((res) => res.json())
      .then((newAddress) => {
        if (newAddress && newAddress.id) {
          const updatedAddresses = [newAddress, ...addresses];
          setAddresses(updatedAddresses);
          setSelectedIndex(0);
          setCity("");
          setStreet("");
        } else {
          Alert.alert("Ошибка", "Не удалось сохранить адрес");
        }
      })
      .catch((err) => {
        console.error("Ошибка при сохранении адреса:", err);
        Alert.alert("Ошибка", "Не удалось сохранить адрес");
      })
      .finally(() => setSaving(false));
  };

  const handleProceed = () => {
    if (selectedIndex === -1) {
      Alert.alert("Ошибка", "Пожалуйста, выберите адрес доставки");
      return;
    }
    navigation.navigate("Order", { selectedAddress: addresses[selectedIndex] });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/fon.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Укажите адрес доставки</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#78B420" />
        ) : (
          <>
            <View style={styles.addressList}>
              <ScrollView style={{ maxHeight: 250 }}>
                {addresses.map((addr, index) => (
                  <TouchableOpacity
                    key={addr.id || index}
                    style={styles.addressItem}
                    onPress={() => handleSelectAddress(index)}
                  >
                    <Text style={styles.addressText}>
                      {addr.city}, {addr.street}
                    </Text>
                    <View style={styles.radioOuter}>
                      {selectedIndex === index && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Text style={[styles.title, { marginTop: 20, fontSize: 22 }]}>
              Добавить новый адрес
            </Text>

            <TextInput
              placeholder="Город"
              value={city}
              onChangeText={setCity}
              style={styles.input}
            />
            <TextInput
              placeholder="Улица"
              value={street}
              onChangeText={setStreet}
              style={styles.input}
            />

            <TouchableOpacity
              style={[styles.button, saving && { backgroundColor: "#999" }]}
              onPress={handleSaveAddress}
              disabled={saving}
            >
              <Text style={styles.buttonText}>
                {saving ? "Сохраняем..." : "Сохранить адрес"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={handleProceed}
            >
              <Text style={styles.buttonText}>Выбрать адрес и перейти к заказу</Text>
            </TouchableOpacity>
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: "faberge",
    color: "#000",
    marginBottom: 10,
  },
  addressList: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    maxHeight: 250,
  },
  addressItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  addressText: {
    fontSize: 16,
    fontFamily: "faberge",
    color: "#000",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#78B420",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#78B420",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginTop: 10,
    fontFamily: "faberge",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#78B420",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "faberge",
  },
});
