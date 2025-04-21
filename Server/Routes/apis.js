// const jwt = require("jsonwebtoken");
// const { Product, Users } = require("../Models/models");
// const { fetchUser, upload } = require("../Middlewares/middlewares");

// app.post('/signup',async(req,res)=>{
//     let check = await Users.findOne({email:req.body.email});
//     if(check){
//       return res.status(400).json({success:false,error:"exisiting user found with same email address"})
//     }
//     let cart= {};
//     for(let i=0; i<300; i++){
//       cart[i]=0;
//     }
//     const user=new Users({
//       name:req.body.username,
//       email:req.body.email,
//       password:req.body.password,
//       cartData:cart,
//     })
  
//     await user.save();
//   //jwt authentication
//     const data={
//       user:{
//         id:user.id
//       }
//     }
  
//     const token= jwt.sign(data,process.env.SECRET_KEY)
//     res.json({success:true,token})
    
//   })

//   app.post('/addproduct',async(req,res)=>{
//     let products=await Product.find({});
//     let id;
//     if(products?.length>0){
//       let last_product_array= products.slice(-1);
//       let last_product=last_product_array[0];
//       id=last_product.id+1;
//     }else{
//       id=1;
//     }
//     const product= new Product({
//       id:id,
//       name:req.body.name,
//       image:req.body.image,
//       category:req.body.category,
//       new_price:req.body.new_price,
//       old_price:req.body.old_price,
//     });
//     console.log(product);
//     await product.save();
//     console.log("Saved..")
//     res.json({
//       success:true,
//       name:req.body.name,
//     })
//   })
//   //creating API for delete product 
//   app.post('/removeproduct',async(req,res)=>{
//     await Product.findOneAndDelete({id:req.body.id});
//     console.log("Removed");
//     res.json({
//       success:true,
//       name:req.body.name,
//     })
//   })
  
//   //Creating API for getting all products
//   app.get("/allproducts",async (req,res)=>{
//        let products= await Product.find({});
//        console.log('All Products Fetched')
//        res.send(products);
//   })
  
  
  
//   //Creating endpoint for user login
//   app.post('/login',async(req,res)=>{
//     let user = await Users.findOne({email:req.body.email});
//     if(user){
//       const passCompare = req.body.password === user.password;
//       if(passCompare){
//         const data = {
//           user: {
//             id:user.id
//           }
//         }
//         const token= jwt.sign(data,'secret_ecom')
//         res.json({success:true,token});
//       }else{
//         res.json({success:false,errors:'wrong password'});
//       }
//       }
//       else{
//         res.json({success:false,errors:'Wrong EmailId'})
//       }
      
//   })
  
//   //Creating endpoint for newcollection data
//   app.get('/newcollections',async(req,res)=>{
//     let products = await Product.find({});
//     let newcollection= products.slice(1).slice(-8);
//     console.log('NewCollection Fetched');
//     res.send(newcollection);
//   })
  
//   //Creating endpoint for popular in women section
//   app.get('/popularinwomen',async(req,res)=>{
//     let products= await Product.find({category:'women'});
//     let popular_in_women=products.slice(0,4);//no of products to display in screen
//     console.log("Popular in women fetched")
//     res.send(popular_in_women)
//   })
  
  
//   //Creating endpoint for adding products in CartData
//   app.post('/addtocart',fetchUser,async(req,res)=>{
//     console.log('Added',req.body.itemId)
//     let userData= await Users.findOne({_id:req.user.id});
//     userData.cartData[req.body.itemId]+=1;
//     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
//     res.send('Added')
//   })
  
//   //Creating endpoint to remove product from cartData
//   app.post('/removefromcart',fetchUser,async(req,res)=>{
//     console.log('removed',req.body.itemId)
//     let userData= await Users.findOne({_id:req.user.id});
//     if(userData.cartData[req.body.itemId]>0)
//     userData.cartData[req.body.itemId]-=1;
//     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
//     res.send('Added')
//   })
  
//   //Creating endpoint to get cartdata
//   app.post('/getcart',fetchUser, async(req,res)=>{
//     console.log('GetCart');
//     let userData= await Users.findOne({_id:req.user.id})
//     res.json(userData.cartData);
//   })


const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Product, Users } = require("../Models/models");
const { fetchUser, upload } = require("../Middlewares/middlewares");

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
  let products = await Product.find({});
  let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

  const product = new Product({
    id: id,
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
  let products = await Product.find({});
  res.send(products);
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
  res.json(userData.cartData);
});

// Single image upload
router.post('/single', upload.single('image'), (req, res) => {
  res.status(200).json({ message: 'Image uploaded successfully', file: req.file });
});

module.exports = router;
