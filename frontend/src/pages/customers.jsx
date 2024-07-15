import React from 'react'

const customers = () => {

  return (
    <div className='flex '>
    <form action="">
    <div className='flex flex-col '>
      <h1 className='text-3xl'>Customer page</h1>
      <label className='my-1 text-blue-700'>Enter Name</label>
      <input 
      type='text' 
      placeholder='Enter Customer Name'
      value={null}
      className='border border-slate-900 my-2'
      />
      <button className='border border-blue-700 bg-blue-900'> Create Customer </button>
    </div>
    </form>
    </div>
  )
}

export default customers
