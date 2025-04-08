// Примерный файл для работы с данными (menu_model.js)
const getCategories = () => {
  return new Promise((resolve, reject) => {
    // Тут можно запросить данные из базы данных или статически вернуть.
    const categories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' }
    ];
    resolve(categories);
  });
};

const getMenuItems = () => {
  return new Promise((resolve, reject) => {
    // Аналогично возвращаем данные для меню
    const menuItems = [
      { id: 1, name: 'Item 1', categoryId: 1 },
      { id: 2, name: 'Item 2', categoryId: 1 },
      { id: 3, name: 'Item 3', categoryId: 2 }
    ];
    resolve(menuItems);
  });
};

const createMenuItem = (item) => {
  return new Promise((resolve, reject) => {
    // Тут будет логика для создания нового элемента меню
    // Например, добавление в базу данных
    resolve({ id: Date.now(), ...item });
  });
};

const deleteMenuItem = (id) => {
  return new Promise((resolve, reject) => {
    // Тут будет логика для удаления элемента по ID
    resolve({ message: `Item with id ${id} deleted` });
  });
};

module.exports = { getCategories, getMenuItems, createMenuItem, deleteMenuItem };
