import mongoose from "mongoose";
const contentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  pageTitle: {
    type: String,
    required: true,
  },
});
const Content = mongoose.model("Content", contentSchema);
export { Content };
