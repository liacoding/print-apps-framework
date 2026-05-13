import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV_CONFIG } from "./config/envConfig.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/api/health", (req, res) => {
  res.send("Hello World");
});

// Serve static files 

if(ENV_CONFIG.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  })
} 

app.listen(ENV_CONFIG.PORT, () => {
  console.log(`Server is running on port ${ENV_CONFIG.PORT}`);
})