import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "FOR_SALE",
    },
    createdAt: {
      type: Date,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("product", productSchema);
