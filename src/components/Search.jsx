import React, { useEffect, useState } from 'react'

function Search(prop) {
    // console.log(prop);
    
    let serBox1 = " h-0 "
    let serBox2 = "h-13 "
    

    useEffect(()=>{
        // console.log(prop);
        
    },[prop])

  return (
    <div className='w-full'>
        <div className={`mt-0 w-full right-0 bg-transparent ${prop.open ? serBox2 : serBox1} transition-all duration-700 p-1`}>
            <input 
            type="text"
            placeholder='Search Songs...' 
            className='w-full h-full bg-amber-100/20 rounded-lg outline-none pl-3' 
            onChange={(e)=>{prop.fun(e)}}
            />
        </div>
    </div>
  )
}

export default Search