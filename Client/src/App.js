import './App.css';
import { Suspense,lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import men_banner from "./components/assets/banner_mens.png"
import women_banner from "./components/assets/banner_women.png"
import kids_banner from "./components/assets/banner_kids.png"
const Loader = lazy(()=>import("./components/LoadingSpinner/Loader"))
const Cart = lazy(()=>import("./pages/Cart"))
const LoginSignup = lazy(()=>import("./pages/LoginSignup"))
const Product =lazy(()=>import("./pages/Product"))
const Navbar =lazy(()=>import("./components/Navbar/Navbar"))
const Footer = lazy(()=>import("./components/Footer/Footer"))
const Shop = lazy(()=>import("./pages/Shop"))
const ShopCategory = lazy(()=>import("./pages/ShopCategory"))
function App() {
  return (
  <>
  <Suspense fallback={<Loader/>}>
   <BrowserRouter>
   <Navbar/>
    <Routes>
      <Route path="/" element={<Shop/>}/>
      <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/> }/>
      <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/> }/>
      <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid"/> }/>
      <Route path='/product' element={<Product/> }/>
      <Route path='/product/:productId' element={<Product/> }/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/login" element={<LoginSignup/>}/>
      </Routes> 
      <Footer/>
   </BrowserRouter>
   </Suspense>
  </>
  );
}

export default App;
