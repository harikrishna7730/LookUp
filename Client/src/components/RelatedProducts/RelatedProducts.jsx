import React, { useContext } from "react";
import "./RelatedProducts.css";
// import data_product from "../assets/data";
import Item from "../Item/Item";
import { ShopContext } from "../../context/ShopContext";
const RelatedProducts = () => {
  const{all_product}=useContext(ShopContext)
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr></hr>
      <div className="relatedproducts-item">
        {all_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
