import mongoose from "mongoose";

import bcrypt from "bcrypt";
import Country from "./country.entity.js";
import City from "./city.entity.js";

const { Schema } = mongoose;

const schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    country_id: {
      type: Schema.Types.ObjectId,
      ref: Country,
    },
    city_id: {
      type: Schema.Types.ObjectId,
      ref: City,
    },
  },
  { collection: "students", timestamps: true }
);

schema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }

  next();
});

export default mongoose.model("Student", schema);
