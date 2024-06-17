import mongoose from "mongoose";
const { Schema } = mongoose;
import Country from "./country.entity.js";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country_id: {
      type: Schema.Types.ObjectId,
      ref: Country,
      required: true,
    },
  },

  { collection: "cities" }
);

export default mongoose.model("City", schema);
