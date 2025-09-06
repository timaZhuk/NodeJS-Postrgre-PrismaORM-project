require("dotenv").config();
const express = require("express");
const authorRoutes = require("./routes/authorRoutes.js");
const bookRoutes = require("./routes/bookRoutes.js");
//add prometheus client
const promClient = require("prom-client");

const app = express();

//middleware --> to read json format
app.use(express.json());

// -- add prometheus registry
// -- This is a container for all your metrics
const register = new promClient.Registry();
// -- automatically collects Node js metrics: memory usage, CPU usage, event loop lag
promClient.collectDefaultMetrics({ register });

//request counter
const httpRequestsCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

register.registerMetric(httpRequestsCounter);

//Middleware tp track API requests
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestsCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });
  next();
});

//Expose the /metrics endpoint for prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

//author routes --> /api/author/add-author
app.use("/api/author", authorRoutes);

//book routes --> /api/book/add-new-book
app.use("/api/book", bookRoutes);

//create a server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is now running at port ${PORT}`));
