import mongoose from "mongoose";

const { Schema, model } = mongoose;

const teaSchema = new Schema({
  dateCreated: { type: Date, default: Date.now }, //assigning object with options (type = datatype (string) , default = default value when adding a new document).
  name: { type: String, required: true },
  description: String,
  category: {
    type: String,
    required: true,
    enum: ["black", "green", "herbal", "fruit"],
  },
  ingredients: { type: [String] },
  price: { type: Number, default: 1 },
});

//creating the model which we can use to interact with the database
const Tea = model("Tea", teaSchema);

export default Tea;
