import React, { useContext } from 'react';
import "./CartItems.css";
import remove_icon from "../assets/cart_cross_icon.png";
import { ShopContext } from '../../context/ShopContext';
const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handleCheckout = async () => {
  const res = await loadRazorpayScript();

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const totalAmount = getTotalCartAmount() * 100; // in paise for Razorpay

  const options = {
    key: "rzp_test_opFPKh09ZdKA4U", // Replace with your Razorpay Test/Live Key
    amount: totalAmount.toString(),
    currency: "INR",
    name: "Your Shop Name",
    description: "Thank you for shopping!",
    image: "https://your-logo-url.com/logo.png", // optional
    handler: function (response) {
      alert("Payment Successful. Payment ID: " + response.razorpay_payment_id);
      // You can clear cart or navigate to a success page here
    },
    prefill: {
      name: "Abhi",
      email: "customer@example.com",
      contact: "7730800724",
    },
    notes: {
      address: "Customer Address",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product?.map((e) => {
        const quantity = cartItems?.[e.id] || 0; // Ensure it’s at least 0
        console.log(cartItems)
        if (quantity > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{quantity}</button>
                <p>${e.new_price * quantity}</p>
                <img className='cartitems-remove-icon' src={remove_icon} alt='' onClick={() => removeFromCart(e.id)} />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cartitems-promocode">
            <p>If you have a promo code, enter it here:</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;




