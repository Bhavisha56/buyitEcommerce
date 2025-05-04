import React from 'react'

const SubNavbar = () => {
  return (
    <>
    <div className='bg-lime-500 w-full h-12'>
        <div className='text-black  p-3'>
        <ul className='flex justify-evenly items-center '>
         <li className='cursor-pointer active:scale-90'>Bestsellers</li>
         <li className='cursor-pointer active:scale-90'>Mobiles</li>
         <li className='cursor-pointer active:scale-90'>Today's Deals</li>
         <li className='cursor-pointer active:scale-90'>Prime</li>
         <li className='cursor-pointer active:scale-90'>Customer Service</li>
         <li className='cursor-pointer active:scale-90'>New Releases</li>
         <li className='cursor-pointer active:scale-90'>Electronics</li>
         <li className='cursor-pointer active:scale-90'>Home & Kitchen</li>
         <li className='cursor-pointer active:scale-90'>Computers</li>
         <li className='cursor-pointer active:scale-90'>Books</li>
        <li className='cursor-pointer active:scale-90'>Car & Motorbike</li>
</ul>
        </div>

    </div>
    </>
  )
}

export default SubNavbar