const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect()
    .then(() => console.log('Подключение к базе данных успешно установлено'))
    .catch(err => console.error('Ошибка подключения к базе данных:', err));

module.exports = client;

