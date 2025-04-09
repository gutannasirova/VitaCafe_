import express from "express";
import { getMenuItems, createMenuItem, deleteMenuItem } from "../controllers/menuItemsController.js";

const router = express.Router();

// Получение всех элементов меню
router.get("/menu_items", getMenuItems);

// Создание нового элемента меню
router.post("/menu_items", createMenuItem);

// Удаление элемента меню по ID
router.delete("/menu_items/:id", deleteMenuItem);

export default router;