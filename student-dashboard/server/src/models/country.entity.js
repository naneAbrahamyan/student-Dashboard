import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: false,
    },
  },

  { collection: "countries" }
);

export default mongoose.model("Country", schema);
