import mongoose from "mongoose";
import validator from "validator";

const HabitSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    content: {
      type: String,
      required: true,
    },
    index: Number,
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
