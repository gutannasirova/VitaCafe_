import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  Modal,
  Animated,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

export const getAllCategories = async () => {
  const res = await fetch("http://localhost:3000/categories");
  const data = await res.json();
  return data;
};

export const getAllMenuItems = async () => {
  const res = await fetch("http://localhost:3000/menu_items");
  const data = await res.json();
  return data;
};


const imageMap = {
  "food_image2.png": require("./assets/food_image2.png"),
};

const MenuScreen = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [caloriesRange, setCaloriesRange] = useState([150, 3000]);
  const [priceRange, setPriceRange] = useState([300, 3000]);
  const [searchQuery, setSearchQuery] = useState("");
  const modalAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await getAllCategories();
        const items = await getAllMenuItems();
        setCategories(cats);
        setMenuItems(items);

        const defaultCategoryId = cats[0]?.id;
        setSelectedCategory(defaultCategoryId);
        setFilteredData(items.filter((item) => item.category_id === defaultCategoryId));
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
    fetchData();
  }, []);

  const openFilter = () => {
    setIsFilterVisible(true);
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeFilter = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsFilterVisible(false));
  };

  const applyFilters = () => {
    const filtered = menuItems.filter(
      (item) =>
        item.category_id === selectedCategory &&
        item.calories >= caloriesRange[0] &&
        item.calories <= caloriesRange[1] &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1]
    );
    setFilteredData(filtered);
    closeFilter();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredData(menuItems.filter((item) => item.category_id === selectedCategory));
      return;
    }

    const found = menuItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        item.category_id === selectedCategory
    );
    setFilteredData(found);
  };

  const modalTranslateY = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

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

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Категории</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>Смотреть все</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
            <Feather name="sliders" size={22} color="black" />
          </TouchableOpacity>

          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryButton,
                selectedCategory === cat.id && styles.categoryButtonActive,
              ]}
              onPress={() => {
                setSelectedCategory(cat.id);
                setSearchQuery("");
                setFilteredData(menuItems.filter((item) => item.category_id === cat.id));
              }}
            >
              <Text
                style={
                  selectedCategory === cat.id
                    ? styles.categoryTextActive
                    : styles.categoryText
                }
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={styles.foodList}
          renderItem={({ item }) => (
            <View style={styles.foodCard}>
              <Image
                source={imageMap[item.image_url] || require("./assets/food_image2.png")}
                style={styles.foodImage}
              />
              <Text style={styles.foodTitle}>{item.title}</Text>
              <Text style={styles.foodCalories}>{item.calories} ккал</Text>
              <Text style={styles.foodPrice}>{item.price}р</Text>
              <TouchableOpacity style={styles.addToCart}>
                <Feather name="shopping-cart" size={18} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />

        <Modal visible={isFilterVisible} transparent={true} animationType="none" onRequestClose={closeFilter}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContainer, { transform: [{ translateY: modalTranslateY }] }]}>
              <Text style={styles.modalTitle}>Фильтры</Text>
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Калорийность</Text>
                <View style={styles.sliderContainer}>
                  <Text>{caloriesRange[0]}</Text>
                  <Slider
                    style={{ width: "80%", height: 40 }}
                    minimumValue={100}
                    maximumValue={3000}
                    step={50}
                    value={caloriesRange[0]}
                    onValueChange={(value) => setCaloriesRange([value, caloriesRange[1]])}
                    minimumTrackTintColor="#76b82a"
                    maximumTrackTintColor="#ccc"
                  />
                  <Text>{caloriesRange[1]}</Text>
                </View>
              </View>
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Стоимость</Text>
                <View style={styles.sliderContainer}>
                  <Text>{priceRange[0]}</Text>
                  <Slider
                    style={{ width: "80%", height: 40 }}
                    minimumValue={200}
                    maximumValue={3000}
                    step={100}
                    value={priceRange[0]}
                    onValueChange={(value) => setPriceRange([value, priceRange[1]])}
                    minimumTrackTintColor="#76b82a"
                    maximumTrackTintColor="#ccc"
                  />
                  <Text>{priceRange[1]}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                <Text style={styles.applyButtonText}>Применить</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
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
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 16,
    color: "#76b82a",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 10,
  },
  categoryButton: {
    backgroundColor: "#76b82a",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: "#fff",
  },
  categoryText: {
    fontSize: 16,
    color: "black",
  },
  categoryTextActive: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodList: {
    marginTop: 15,
    paddingBottom: 100,
  },
  foodCard: {
    backgroundColor: "#76b82a",
    width: "48%",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  foodImage: {
    width: 150,
    height: 120,
    alignSelf: "center",
  },
  foodTitle: {
    fontSize: 18,
    color: "#fff",
    marginTop: 5,
  },
  foodCalories: {
    fontSize: 14,
    color: "#fff",
  },
  foodPrice: {
    fontSize: 20,
    color: "#fff",
    marginVertical: 5,
  },
  addToCart: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 25,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  applyButton: {
    backgroundColor: "#76b82a",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MenuScreen;
