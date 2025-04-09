import React from 'react'
import "../Hero/Hero.css"
import  hand_icon from "../assets/hand_icon.png"
import arrow_icon from "../assets/arrow.png"
import hero_image from "../assets/hero-image2.webp"

const Hero = () => {
  return (
    <div className='hero'>
       <div className='hero-left'>
          <h2>NEW ARRIVALS ONLY</h2>
          <div>
            <div className='hero-hand-icon'>
               <p>new</p>
               <img src={hand_icon} alt='hand-icon'/>
            </div>
            <p>collections</p>
            <p>for everyone</p>
          </div>
          <div className='hero-latest-btn'>
            <a href="#collections latest-button" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>Latest collection</span>
              <img src={arrow_icon} alt='arrow-icon' />
            </a>
          </div>

       </div>
       <div className='hero-right'>
        <img src={hero_image} alt='' height={550}/>
       </div>
    </div>
  )
}

export default Hero
