import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getAllCategories, getAllMenuItems } from "../queries";

const MenuScreen = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCategories();
        const menuItemsData = await getAllMenuItems();
        setCategories(categoriesData);
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Меню</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{item.name}</Text>
            <FlatList
              data={menuItems.filter((menuItem) => menuItem.category_id === item.id)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.menuItemContainer}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemPrice}>{item.price} руб.</Text>
                </View>
              )}
              numColumns={2}
              contentContainerStyle={styles.menuItemsContainer}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuItemsContainer: {
    justifyContent: "space-between",
  },
  menuItemContainer: {
    width: "48%",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 14,
    color: "#666",
  },
});

export default MenuScreen;