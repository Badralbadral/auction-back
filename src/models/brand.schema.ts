import mongoose, { model, Schema } from "mongoose";

const BrandSchema = new Schema({
  brandTitle: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

export const BrandModel = mongoose.models.Brand || model("Brand", BrandSchema);
