import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

const routesDir = path.join(__dirname);

try {
  const files = fs.readdirSync(routesDir);
  const routePromises = files.map(async (file) => {
    if (file !== "index.js" && file.endsWith(".js")) {
      const routePath = path.join(routesDir, file);
      const route = await import(`file://${routePath}`);
      router.use(route.default);
    }
  });
  await Promise.all(routePromises);
} catch (error) {
  console.error(`Error reading directory: ${error.message}`);
}

export default router;