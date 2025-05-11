import React, { useContext,  useState } from 'react'
import "../Navbar/Navbar.css"
import logo from "../assets/Main-logo.png"
import cartIcon from "../assets/shopping-cart.png"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
function Navbar() {
  const [menu,setMenu]=useState("shop")
  const[Open,setOpen]=useState(false)
  const{getTotalCartItems}=useContext(ShopContext)
  return (
    <nav className='navbar'>
        <div className='nav-logo'>
          <Link to={'/'}><img src={logo} alt='logo' width={200} loading="lazy"/></Link>
        </div>
         {
    Open ? 
    <div className='menu closebtn' onClick={()=>setOpen(false)}>X</div>
   :
    <div className='menu' onClick={()=>setOpen(true)}>
      <span></span>
      <span></span>
      <span></span>
    </div>
     }
        <div>
          <ul className={`list-items ${Open ? 'open' : ''}`}>
            <li  onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:"none"}} to="/">Shop</Link> {menu ==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:"none"}} to="/mens">Men</Link> {menu ==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:"none"}} to="/womens">Women</Link> {menu ==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:"none"}} to="/kids">Kids</Link> {menu ==="kids"?<hr/>:<></>}</li>
          </ul>
        </div>
        <div className={`nav-login-cart ${Open ? 'open' : ''}`}>
          {localStorage.getItem('auth-token')?
          <button className='' onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>
          :
          <Link to='/login'><button>Login</button></Link>}
          <Link to="/cart"><img src={cartIcon} alt='carticon' loading="lazy" width={40}/></Link>
          <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
    </nav>
  )
}

export default Navbar