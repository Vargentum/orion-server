import mongoose from "mongoose";
import { CATEGORY_TYPES } from "../utils/constants";

export const name = "Category";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.keys(CATEGORY_TYPES),
    required: true,
  },
});

export default mongoose.model(name, schema);
