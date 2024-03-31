import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import { useNavigate, Navigate, Link } from 'react-router-dom'

const Home = () => {
  const {authState, login, logout} = useContext(AuthContext)
  const navigate = useNavigate()
  

  const handleClick = () => {
    return <Navigate to="/products"/>
  }
  return (
    <div>
      <button onClick={()=> navigate('/products')}>Navigate to prodct page wen uing useNavigate </button>
      <Link to="/products">

      <button>Navigate to product page using withou component</button>
      </Link>
    </div>
  )
}

export default Home
