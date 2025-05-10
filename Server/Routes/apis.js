const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const  {Product ,Users}= require("../Models/models")

const {fetchUser} = require("../Middlewares/middlewares");
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
// Signup endpoint
router.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, error: "User with this email already exists." });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart
  });

  await user.save();

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, process.env.SECRET_KEY);
  res.json({ success: true, token });
});

// Add product
router.post('/addproduct', async (req, res) => {
  // let products = await Product.find({});
  // let generatedId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  const latestProduct = await Product.findOne().sort({ id: -1 });
  const generatedId = latestProduct ? latestProduct.id + 1 : 1;
  
  const product = new Product({
    id: generatedId,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
});

// Delete product
router.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

// Get all products
router.get('/allproducts', async (req, res) => {
  try {
    let products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, process.env.SECRET_KEY);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong EmailId" });
  }
});

// New collections
router.get('/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  res.send(newcollection);
});

// Popular in women
router.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({ category: 'women' });
  let popular_in_women = products.slice(0, 4);
  res.send(popular_in_women);
});

// Add to cart
router.post('/addtocart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send('Added');
});

// Remove from cart
router.post('/removefromcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send('Removed');
});

// Get cart data
router.post('/getcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  console.log("User Data:", userData);
  res.json(userData.cartData);
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/add-product', upload.single('image'), async (req, res) => {
  console.log(req.file);  // your uploaded file info
  console.log(req.body);  // your productName & price
  try {
    const { name, category, new_price, old_price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Upload image to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'products' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        const counterSchema = new mongoose.Schema({
          _id: String,
          seq: { type: Number, default: 0 }
        });
        
        const Counter = mongoose.model('Counter', counterSchema);
        
        // Function to get next id
        const getNextId = async () => {
          const counter = await Counter.findByIdAndUpdate(
            { _id: 'productid' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
          );
          return counter.seq;
        };

        // Save product with imageUrl to MongoDB
        const generatedId = await getNextId();
        const newProduct = new Product({
          id:generatedId,
          name,
          category,
          new_price,
          old_price,
          image: result.secure_url,
        });

        await newProduct.save();

        res.json({
          message: 'Product added successfully!',
          product: newProduct,
        });
      }
    );

    stream.end(req.file.buffer);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
