// root route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ ADD HERE
app.get("/test-db", async (req, res) => {
  const Test = (await import("./models/Test.js")).default;

  const data = await Test.create({
    name: "Rachit",
    time: new Date()
  });

  res.json(data);
});