import mongoose from "mongoose";

const questionScheme = mongoose.Schema(
  {
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: Number, required: true }, // Index of the correct option
  },
  { timestamp: true }
);

export default mongoose.model("question", questionScheme);
