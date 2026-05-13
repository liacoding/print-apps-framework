import express from "express";
import path from "path";
import { ENV_CONFIG } from "./config/envConfig.js";

const app = express();

const __dirname = path.resolve();

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