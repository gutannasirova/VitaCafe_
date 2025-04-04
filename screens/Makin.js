import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";



const OrderScreen = () => {

  return (
    <ImageBackground source={require("./assets/fon.png")} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Заказ оформлен</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Статус заказа</Text>
          <Text style={styles.status}>Оформлен</Text>
          <Text style={styles.orderNumber}>№384728</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Дата и время заказа:</Text> 15.02.2025 в 15:20
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Адрес:</Text> Г. Москва, Ленинградское шоссе 15, кв 67
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Способ оплаты:</Text> Картой
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Получатель:</Text> Фарангиз
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Телефон:</Text> 89168987654
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Блюда в заказе</Text>

        <View style={styles.orderList}>
          <Text style={styles.orderItem}>
            Салат с бурратой ( 2шт ) <Text style={styles.price}>550₽</Text>
          </Text>
          <Text style={styles.orderItem}>
            Морс ягодный ( 1 шт ) <Text style={styles.price}>120₽</Text>
          </Text>
          <Text style={styles.orderItem}>
            Фруктовый боул ( 1 шт ) <Text style={styles.price}>450₽</Text>
          </Text>
          <Text style={styles.orderTotal}>
            Итого <Text style={styles.price}>1120₽</Text>
          </Text>
        </View>

        <View style={styles.bonusContainer}>
          <Image source={require("./assets/Ava.png")} style={styles.bonusIcon} />
          <Text style={styles.bonusText}>+ 27 баллов за текущий заказ</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: 412, 
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontFamily: "Faberge",
    fontWeight: "bold",
    marginBottom: 10,
  },
  statusContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  statusTitle: {
    color: "#999",
    fontSize: 14,
    fontFamily: "Faberge",
  },
  status: {
    fontSize: 18,
    fontFamily: "Faberge",
  },
  orderNumber: {
    fontSize: 18,
    fontFamily: "Faberge",
    textAlign: "right",
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Faberge",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Faberge",
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderList: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
  },
  orderItem: {
    fontSize: 18,
    fontFamily: "Faberge",
    marginBottom: 5,
  },
  price: {
    fontWeight: "bold",
    textAlign: "right",
  },
  orderTotal: {
    fontSize: 20,
    fontFamily: "Faberge",
    fontWeight: "bold",
    marginTop: 10,
  },
  bonusContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  bonusIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  bonusText: {
    fontSize: 16,
    fontFamily: "Faberge",
  },
});

export default OrderScreen;
