import express from "express";
import { createServer as createViteServer } from "vite";
import { generateDailyRetailData } from "./src/services/retailService.js";
import { getMultimodalInsights } from "./src/services/coordinationService.js";
import { getCoachingInsights } from "./src/services/coachingService.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/retail-data", (req, res) => {
    res.json(generateDailyRetailData());
  });

  app.get("/api/insights", (req, res) => {
    res.json(getMultimodalInsights());
  });

  app.get("/api/coaching-insights", async (req, res) => {
    try {
      console.log("Generating coaching insights...");
      const retailData = generateDailyRetailData();
      const imageMetrics = { quality: 0.8, coverage: 0.9 }; // Mocked for now
      const insights = await getCoachingInsights(retailData, imageMetrics);
      res.json(insights);
    } catch (error) {
      console.error("Error generating coaching insights:", error);
      res.status(500).json({ error: "Failed to generate coaching insights" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from the build directory
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
