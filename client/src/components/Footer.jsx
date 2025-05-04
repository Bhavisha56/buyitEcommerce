import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='bg-lime-500 w-full h-full'>
        <div className='bg-black w-full h-10'>
            <h1 className='text-center text-white pt-2 cursor-pointer'>Back To Top</h1>
        </div>
        <div className='h-52 gap-4 text-center grid grid-cols-5'>
          <div className='flex flex-col justify-center items-center'>
            <ul className='flex flex-col items-center space-y-1 '>
              <li className='font-semibold cursor-pointer'>Get to Know Us</li>
              <li className='cursor-pointer'>About Us</li>
              <li className='cursor-pointer'>Our Story</li>
              <li className='cursor-pointer'>Careers</li>
              <li className='cursor-pointer'>Investor Relations</li>
            </ul>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <ul className='flex flex-col items-center space-y-1'>
              <li className='font-semibold cursor-pointer'>Connect With Us</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <ul className='flex flex-col items-center space-y-1'>
              <li className='font-semibold'>Make Money with Us</li>
              <li>Sell on Platform</li>
              <li>Affiliate Program</li>
              <li>Advertise</li>
              <li>Self-Publish</li>
            </ul>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <ul className='flex flex-col items-center space-y-1'>
              <li className='font-semibold'>Customer Support</li>
              <li>Help Center</li>
              <li>Returns</li>
              <li>Track Order</li>
              <li>Accessibility</li>
            </ul>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <ul className='flex flex-col items-center space-y-1'>
              <li className='font-semibold'>Legal & Policies</li>
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Compliance</li>
            </ul>
          </div>
        </div>
        <div className='bg-black w-full h-8 flex items-center justify-center'>
  <p className='text-white text-sm'>&copy;2025 IndianEcommerceMadeByBhavisha. All rights reserved.</p>
</div>
      </div>
    </>
  )
}

export default Footer
