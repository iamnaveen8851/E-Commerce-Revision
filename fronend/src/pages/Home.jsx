import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";
const Home = () => {
  const { authState, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    return <Navigate to="/products" />;
  };
  return (
    <Box m={"auto"}>
      
     <Heading color={"blue"} mt={20} textAlign={"center"}> Welcome to Ecommerce Shopping Homepage</Heading>
      {/* <Button onClick={()=> navigate('/products')}>Navigate to prodct page wen uing useNavigate </Button>
      <Link to="/products">

      <Button>Navigate to product page using withou component</Button>
      </Link> */}
    </Box>
  );
};

export default Home;
