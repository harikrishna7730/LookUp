import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../components/assets/dropdown_icon.png';
import Item from '../components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOrder, setSortOrder] = useState('');

  // Filtered products by category
  const filteredProducts = all_product.filter(item => item.category === props.category);

  // Sorted products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low-to-high') {
      return a.new_price - b.new_price;
    } else if (sortOrder === 'high-to-low') {
      return b.new_price - a.new_price;
    }
    return 0;
  });

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt='' />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1–{sortedProducts.length}</span> out of {all_product.length} products
        </p>

        <div className="shopcategory-sort">
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Sort by</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
          {/* <img src={dropdown_icon} alt='' /> */}
        </div>
      </div>

      <div className="shopcategory-products">
        {sortedProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      <div className='Explore-btn'>
        <div className="shopcategory-loadmore">
          <span>Explore More</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;

