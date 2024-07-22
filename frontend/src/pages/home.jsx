import React from 'react'
import { useSelector } from 'react-redux'

const home = () => {
  const { name } = useSelector((state) => state.auth);
  return (
    <div>
      heyyyyyyyyy {name}
    </div>
  )
}

export default home;
