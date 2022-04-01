import mongoose from "mongoose";

export const name = "Currency";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
});

export default mongoose.model(name, schema);
