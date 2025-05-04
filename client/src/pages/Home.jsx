import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SubNavbar from '../components/SubNavbar'
import Card from '../components/Card'
import FilterSide from '../components/FilterSide'
import MainCard from '../components/MainCard'
import Footer from '../components/Footer'
import DiscountCard from '../components/DiscountCard'


const Home = () => {
  return (
    <>
    <div>
    <Navbar/>
    <SubNavbar/>
     <div >
     <Card/>
    </div>
    <div className="inline-flex items-center justify-center w-full">
    <hr className="w-full h-2 my-8 bg-gray-200 border-0 rounded-sm dark:bg-lime-500"></hr>
    <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
        <svg class="w-4 h-4  dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
  </svg>
    </div>
</div>    
<div className='flex h-[80vh] px-4'>
      <div className='w-1/5 overflow-y-auto overflow-x-hidden pr-4 border-r border-gray-200'>
        <FilterSide/>
      </div>
      <div className='w-4/5 overflow-y-auto pl-4 overflow-x-hidden   gap-4'>
        <MainCard/>
      </div>
    </div>
    <div className="inline-flex items-center justify-center w-full">
    <hr className="w-full h-2 my-8 bg-gray-200 border-0 rounded-sm dark:bg-lime-500"></hr>
    <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
        <svg class="w-4 h-4  dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
  </svg>
    </div>
</div>    
    <div className='overflow-x-hidden'>
      <DiscountCard/>
    </div>
    <div className='mt-10'>
    <Footer/>
    </div>
    </div>
    </>
  )
}

export default Home