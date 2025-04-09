import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'
import "./Popular.css"
const Popular = () => {
  const [popularProducts,setPopularProducts]=useState([])
  useEffect(()=>{
  fetch('http://localhost:3100/popularinwomen')
  .then((res)=>res.json())
  .then((data)=>setPopularProducts(data))
  },[])
  return (
    <div className='popular'>
      <h1 style={{textAlign:"center"}}>POPULAR IN WOMEN</h1>
      <hr/>
      <div className="popular-item">
        {popularProducts.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
