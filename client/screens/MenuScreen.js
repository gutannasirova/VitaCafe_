import React, { useState, useRef, useContext } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../router/CartContext";

// Карта изображений
const imageMap = {
  "food1.png": require("./assets/food_image1.png"),
  "food2.png": require("./assets/food_image2.png"),
};

// Базовый URL для запросов к API
const API_BASE_URL = 'http://localhost:3000';

// Функции для получения данных
const fetchCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/categories`);
  if (!res.ok) throw new Error("Ошибка при загрузке категорий");
  return res.json();
};

const fetchMenuItems = async () => {
  const res = await fetch(`${API_BASE_URL}/menu_items`);
  if (!res.ok) throw new Error("Ошибка при загрузке элементов меню");
  return res.json();
};

const MenuScreen = () => {
  const { addToCart } = useContext(CartContext);

  // Состояния
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [caloriesRange, setCaloriesRange] = useState([150, 3000]);
  const [priceRange, setPriceRange] = useState([300, 3000]);
  const [searchQuery, setSearchQuery] = useState("");
  const modalAnimation = useRef(new Animated.Value(0)).current;

  // Получение данных через react-query
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  const {
    data: menuItems = [],
    isLoading: isMenuItemsLoading,
    error: menuItemsError,
  } = useQuery({ queryKey: ["menuItems"], queryFn: fetchMenuItems });

  // Установка начальной категории
  React.useEffect(() => {
    if (categories.length > 0 && menuItems.length > 0) {
      const defaultCategoryId = categories[0]?.id;
      setSelectedCategory(defaultCategoryId);
      setFilteredData(menuItems.filter((item) => item.category_id === defaultCategoryId));
    }
  }, [categories, menuItems]);

  // Открытие фильтров
  const openFilter = () => {
    setIsFilterVisible(true);
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Закрытие фильтров
  const closeFilter = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsFilterVisible(false));
  };

  // Применить фильтры
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

  // Обработка поиска
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
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

  // Выбор категории
  const selectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setFilteredData(menuItems.filter((item) => item.category_id === categoryId));
  };

  // Анимация модального окна
  const modalTranslateY = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  return (
    <ImageBackground source={require("./assets/fon.png")} style={styles.background}>
      <View style={styles.container}>
        {/* Хедер */}
        <View style={styles.header}>
          <Text style={styles.logo}>VitaCafe</Text>
        </View>

        {/* Поиск */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Категории */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Категории</Text>
        </View>

        {/* Фильтры + Категории */}
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
              onPress={() => selectCategory(cat.id)}
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

        {/* Список блюд */}
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
              <TouchableOpacity
                style={styles.addToCart}
                onPress={() => {
                  addToCart({
                    ...item,
                    image: imageMap[item.image_url] || require("./assets/food_image2.png"),
                  });
                }}
              >
                <Feather name="shopping-cart" size={18} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Модальное окно фильтров */}
        <Modal visible={isFilterVisible} transparent animationType="none" onRequestClose={closeFilter}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContainer, { transform: [{ translateY: modalTranslateY }] }]}>
              <Text style={styles.modalTitle}>Фильтры</Text>
              {/* Калории */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Калорийность</Text>
                <View style={styles.sliderContainer}>
                  <Text>{Math.round(caloriesRange[0])}</Text>
                  <Slider
                    minimumValue={100}
                    maximumValue={3000}
                    step={50}
                    value={caloriesRange[0]}
                    onValueChange={(value) => setCaloriesRange([value, caloriesRange[1]])}
                    minimumTrackTintColor="#76b82a"
                    maximumTrackTintColor="#ccc"
                  />
                  <Text>{Math.round(caloriesRange[1])}</Text>
                </View>
              </View>
              {/* Цена */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Стоимость</Text>
                <View style={styles.sliderContainer}>
                  <Text>{Math.round(priceRange[0])}</Text>
                  <Slider
                    minimumValue={200}
                    maximumValue={3000}
                    step={100}
                    value={priceRange[0]}
                    onValueChange={(value) => setPriceRange([value, priceRange[1]])}
                    minimumTrackTintColor="#76b82a"
                    maximumTrackTintColor="#ccc"
                  />
                  <Text>{Math.round(priceRange[1])}</Text>
                </View>
              </View>
              {/* Применить */}
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
    alignItems: "center",
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#000",
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 16,
  },
  categoryContainer: {
    marginLeft: 20,
    marginVertical: 15,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    marginLeft: 20,
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
    paddingHorizontal: 15,
    paddingVertical: 6,
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
    alignItems: "center",
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