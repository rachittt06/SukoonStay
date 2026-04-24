import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("API is working fine 🚀");
});

export default app;