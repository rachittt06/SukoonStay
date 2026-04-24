import express from "express";

const app = express();

app.get("/api", (req, res) => {
  res.send("API is working 🚀");
});

export default (req, res) => app(req, res);