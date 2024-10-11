import mongoose from "mongoose";

const quizScheme = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "question" }],
  },
  { timestamp: true }
);

export default mongoose.model("quiz", quizScheme);
