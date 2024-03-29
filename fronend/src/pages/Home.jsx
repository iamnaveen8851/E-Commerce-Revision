import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'

const Home = () => {
  const {authState, login, logout} = useContext(AuthContext)
const navigate = useContext(AuthContext)
  return (
    <div>
      <button onClick={()=> navigate('/')}>Navigate to prodct page wen uing useNavigate </button>
      <button onClick={()=> navigate('/')}>Navigate to product page using withou component</button>
    </div>
  )
}

export default Home
