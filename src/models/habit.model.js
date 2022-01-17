import mongoose from "mongoose";
import validator from "validator";

const HabitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    dates: [{ date: String, complete: Boolean }],
    status: { type: Boolean, default: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

/**
 * @typedef Habit
 */
const Habit = mongoose.model("Habit", HabitSchema);

module.exports = Habit;
