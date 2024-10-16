import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-black text-[white] py-3">
  <div className="container mx-auto px-4 flex flex-wrap justify-around items-center">
    {/* Left Section - Copyright */}
    <div className="text-sm md:text-base">
      <p>@ Password Manager. All rights reserved.</p>
    </div>

    {/* Center Section - Links */}
    <div className="flex space-x-6 mt-4 md:mt-0">
    
      <a href="/privacy" className="hover:text-[#EAD8B1] transition-colors duration-300">Privacy Policy</a>
      <a href="/contact" className="hover:text-[#EAD8B1] transition-colors duration-300">Contact</a>
    </div>

    {/* Right Section - Social Media Icons */}
    
  </div>
</footer>

    </div>
  )
}

export default Footer
