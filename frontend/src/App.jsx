import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar'

function App() {

  return (
    <>
      <div className='grid grid-cols-12 h-screen overflow-auto'>
      <div className='border  col-span-2'><Sidebar/></div>
      <div className='border  col-span-10'><Outlet/></div>
    </div>
    </>
  )
}

export default App
