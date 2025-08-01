import React, { useState } from 'react'
import { DawnArrow, LeftArrow, LibraryLogo, SmallArrow } from '../assets/Svg.jsx'
import { NavLink } from 'react-router-dom';

function Setting() {

  

  function indexer(e){
    console.log(e.target);
    
  }
  return (
    <div className='w-full h-full bg-black p-2 ' >
        <header className='w-full h-10 bg-gray-900 flex justify-between items-center flex-row rounded-2xl'>
            <button className='pl-3' > <LeftArrow size = {25} /> </button>
            <h1 className='pr-3'>SETTING</h1>
        </header>
        <NavLink to={'/library'}>

        <div onClick={indexer} id='library' className="library w-full h-15 bg-gray-700 mt-2 flex flex-row  items-center justify-between p-4 ">
        <LibraryLogo size={18} />
        <span className='gap-5 pointer-events-none' id='text'>
            <h1 id='indexer'>Indexer</h1>
            <p id='manage your'>Manage Your Music Library</p>
        </span>
        <SmallArrow size={18} />
        </div>
        </NavLink>
    </div>
  )
}

export default Setting