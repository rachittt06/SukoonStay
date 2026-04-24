import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("API is working fine 🚀");
});

// 👇 Only run locally
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

// 👇 For Vercel
export default (req, res) => app(req, res);