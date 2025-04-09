import React from 'react'
import "./DescriptionBox.css"
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Review (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
            An e-commerse website is an online platform that facilities the buying and selling of products of services over the internet.
            it serves as a virtual marketplace where businesses and
            individuals can show case their products interact with customers and conduct transaction without the need for a physical persence E-commerce website have gained immense popularity 
            due to their convenience, accessibility , and the global reach they
            Offer.
        </p>
        <p>
          E-commerce website typically display products or services along with detailed descriptions.
          images, prices, and any available varients(eg,sizes,colors).Each product usually has its own
          dedication page with relevent information.
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox
