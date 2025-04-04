const client = require('./database'); 

const getAllCategories = async () => {
    try {
        const res = await client.query('SELECT * FROM categories');
        return res.rows;
    } catch (err) {
        console.error('Ошибка при выполнении запроса к категориям:', err);
        throw err;
    }
};

const getAllMenuItems = async () => {
    try {
        const res = await client.query('SELECT * FROM menu_items');
        return res.rows;
    } catch (err) {
        console.error('Ошибка при выполнении запроса к блюдам:', err);
        throw err;
    }
};

module.exports = {
    getAllCategories,
    getAllMenuItems,
};
