import React from 'react'
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'
import {Box} from '@chakra-ui/react'
const Navbar = () => {
  return (
    <Box  w="90%" m={"auto"} className={styles.navbar} >
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/products">Products</Link>
    </Box>
  )
}

export default Navbar
