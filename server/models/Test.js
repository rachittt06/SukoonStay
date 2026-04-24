import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  name: String,
  time: Date
});

export default mongoose.models.Test || mongoose.model("Test", testSchema);