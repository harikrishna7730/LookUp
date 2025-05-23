const mongoose = require("mongoose");

// Product Schema
const ProductSchema = new mongoose.Schema({
 id:{
  type:Number,
  unique: true,
  required:true,
 },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export User Model
const Users = mongoose.model("User", UserSchema);



// Export Product Model
const Product = mongoose.model("Product", ProductSchema);

module.exports ={ Product, Users};
