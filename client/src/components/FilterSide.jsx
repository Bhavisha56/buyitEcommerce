import React from 'react'

const FilterSide = () => {
  return (
    <>
    <div className= 'filter bg-black w-72  rounded-tr-3xl rounded-br-3xl'>
          <div className='text-white p-8'>
             <h1 className='text-2xl'>Filter By Category</h1>
             <div className='p-2'>
             <ul>
             <h1 className='text-xl m-2'>Department</h1>
            <li><input className='m-3' type="checkbox"  /> All</li>
             <li><input className='m-3' type="checkbox" /> Baby</li>
             <li><input className='m-3' type="checkbox"  /> Bags Wallets</li>
             <li><input className='m-3' type="checkbox"  /> Beauty</li>
             <li><input className='m-3' type="checkbox"  /> Car and Motorbike</li>
             </ul>
             </div>
              
            <div  className='p-2'>
                 <h1 className='text-xl m-2'>Price</h1>
                 <ul>
                   <li><input className='m-3' type="checkbox" /> All</li>
                   <li><input className='m-3' type="checkbox" /> Under ₹500</li>
                   <li><input className='m-3' type="checkbox" /> Under ₹1,000</li>
                   <li><input className='m-3' type="checkbox" /> Under ₹2,000</li>
                   <li><input className='m-3' type="checkbox" /> Under ₹5,000</li>
                   <li><input className='m-3' type="checkbox" /> ₹5,000 and Above</li>
                     </ul>
            </div>

<div className='p-2'>
          <ul>
           <h1 className='text-xl m-2'>Discount</h1>
  <li><input className='m-3' type="checkbox" /> All</li>
  <li><input className='m-3' type="checkbox" /> 10% off or more</li>
  <li><input className='m-3' type="checkbox" /> 25% off or more</li>
  <li><input className='m-3' type="checkbox" /> 50% off or more</li>
</ul>
</div>
          </div>
    </div>
    </>
  )
}

export default FilterSide