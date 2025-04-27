import React from 'react'
import banner from "../images/banner.jpg" 

const Header = () => {
  return (
    <section className="max-container padding-x py-4 relative">
      <div className="w-full h-[300px] overflow-hidden rounded-lg px-10 pl-[4rem] pr-[4rem]">
        <img 
          src={banner} 
          alt="Banner" 
          className="w-full h-full object-cover rounded-lg" 
        />
      </div>
    </section>
  )
}

export default Header
