import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// 👇 IMPORTANT (this is what was missing earlier)
export default (req, res) => {
  return app(req, res);
};