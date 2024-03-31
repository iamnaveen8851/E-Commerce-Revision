import React from "react";
import styles from "./productCard.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Box, Image } from "@chakra-ui/react";

const ProductCard = ({ id, title, image, price, rating }) => {
  const navigate = useNavigate();
  return (
    <Box p={10} display={"flex"} gap={5}>
      <Box >
        <Image mt={10} w="200px" h={"100px"} src={image} alt={title} />
      </Box>
      <Box >
        <h3>{title}</h3>
        <h3>Rs. {price}</h3>
        <h3>{rating.rate} stars</h3>
        <br />
        <Box display={"flex"} gap={"5px"}>
          {" "}
          <Button onClick={() => navigate(`/products/${id}`)}>
            View Details
          </Button>
          <Button>Add to Cart</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
