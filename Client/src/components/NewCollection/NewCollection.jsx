import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '../Item/Item';
import './NewCollection.css';

const NewCollection = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3100/newcollections')
      .then((response) => {
        setNew_collection(response.data);
      })
      .catch((error) => {
        console.error("Error fetching new collections:", error);
      });
  }, []);

  return (
    <div className='new-collections' id="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections-items">
        {new_collection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollection;

