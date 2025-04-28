// import React from 'react'
// import "./Item.css"
// import { Link } from 'react-router-dom'
// const Item = (props) => {
//   return (
//     <div className='item'>
        //  <Link to={`/product/${props.id}`}> <img onClick={window.scrollTo(0,0)} src={props.image} alt='' width={300} loading="lazy"/></Link>
//           <p>{props.name}</p>
      //  <div className='item-prices'>
      //    <div className="item-price-new">
      //    ${props.new_price}
      //    </div>
      //    <div className='item-price-old'>
      //    ${props.old_price}
      //    </div>
      //  </div>
//     </div>
//   )
// }

// export default Item


// import React, { useState, useEffect } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import { Link } from 'react-router-dom';
// import "./Item.css"
// const Item = (props) => {
//   const [loaded, setLoaded] = useState(false);

//   const handleImageLoad = () => {
//     setLoaded(true);
//   };

//   return (
//     <div className='item'>
//       <div className="image-container">
//         {!loaded && <Skeleton height={300} width={300} />}
//                  <Link to={`/product/${props.id}`}> <img onClick={window.scrollTo(0,0)} src={props.image} alt={props.name} onLoad={handleImageLoad} width={300} loading="lazy"/></Link>
//       </div>
//       <p>{props.name}</p>
//       <div className='item-prices'>
//          <div className="item-price-new">
//          ${props.new_price}
//          </div>
//          <div className='item-price-old'>
//          ${props.old_price}
//          </div>
//        </div>
//     </div>
//   );
// };

// export default Item;


import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton'; // Import the Skeleton library
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton styles
import './Item.css'; // Import custom styles

const Item = ({ id, name, image, new_price, old_price }) => {
  const [loading, setLoading] = useState(true); // Loading state for skeleton
  // const [itemData, setItemData] = useState({ name, image, new_price, old_price });

  // Simulate a loading delay for each item (1.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // After 1.5 seconds, stop loading and display the item content
    }, 1500); // Delay time

    return () => clearTimeout(timer); // Cleanup timer when the component unmounts
  }, []);

  return (
    <div className="item">
      {loading ? (
        // Display skeleton loader if still loading
        <div className="item-skeleton">
          <Skeleton height={330} width={300} />
          <Skeleton height={30} width={300} />
          <Skeleton height={20} width={300} />
        </div>
      ) : (
        // Display actual item data after loading
        <div className="item-content">
          <img src={image} alt={name} height="330" width="300" />
          <p>{name}</p>
          <div className="price item-prices">
            <span className="item-price-new">${new_price}</span>
            {old_price && <span className="item-price-old">${old_price}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
