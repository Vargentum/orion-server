import mongoose from "mongoose";

export const name = "User";

const schema = mongoose.Schema({
  avatar: String,
  name: String,
  email: {
    type: String,
    required: true,
    immutable: true,
    lowercase: true,
    index: { unique: true },
  },
});

export default mongoose.model(name, schema);
