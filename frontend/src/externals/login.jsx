import React from 'react'

const login = () => {
  return (
    <div>
      <form action='/login' method='post'>
      <label htmlFor='username'>Username</label>
      <input type='text' id='username' name='username'/>
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' name='password'/>
      <button>Login</button>
      </form>
    </div>
  )
}

export default login
