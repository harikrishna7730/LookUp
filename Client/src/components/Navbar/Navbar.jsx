import React, { useContext,  useState } from 'react'
import "../Navbar/Navbar.css"
import logo from "../assets/Main-logo.png"
import cartIcon from "../assets/shopping-cart.png"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
function Navbar() {
  const [menu,setmenu]=useState("shop")
  const{getTotalCartItems}=useContext(ShopContext)

  return (
    <div className='navbar'>
        <div className='nav-logo'>
          <Link to={'/'}><img src={logo} alt='logo' width={200}/></Link>
        </div>
        <div >
          <ul  className='list-items'>
            <li  onClick={()=>{setmenu("shop")}}><Link style={{textDecoration:"none"}} to="/">Shop</Link> {menu ==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setmenu("mens")}}><Link style={{textDecoration:"none"}} to="/mens">Men</Link> {menu ==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setmenu("womens")}}><Link style={{textDecoration:"none"}} to="/womens">Women</Link> {menu ==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setmenu("kids")}}><Link style={{textDecoration:"none"}} to="/kids">Kids</Link> {menu ==="kids"?<hr/>:<></>}</li>
          </ul>
        </div>
        <div className='nav-login-cart'>
          {localStorage.getItem('auth-token')?
          <button className='' onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>
          :
          <Link to='/login'><button>Login</button></Link>}
          <Link to="/cart"><img src={cartIcon} alt='carticon' width={40}/></Link>
          <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar