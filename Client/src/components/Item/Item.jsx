import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ id, name, image, new_price, old_price }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="item">
      {loading ? (
        <div className="item-skeleton">
          <Skeleton height={330} width={300} />
          <Skeleton height={30} width={300} />
          <Skeleton height={20} width={300} />
        </div>
      ) : (
        <Link to={`/product/${id}`} className="item-link" onClick={() => window.scrollTo(0, 0)}>
          <div className="item-content">
            <img src={image} alt={name} height="330" width="300" loading="lazy" />
            <p>{name}</p>
            <div className="price item-prices">
              <span className="item-price-new">${new_price}</span>
              {old_price && <span className="item-price-old">${old_price}</span>}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Item;
