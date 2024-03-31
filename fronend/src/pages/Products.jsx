import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import ProductCard from "../components/ProductCard";
import styles from "./products.module.css";
import { useSearchParams } from "react-router-dom";
import { Select, Box, Button } from "@chakra-ui/react";
export function productReducer(prevState, { type, payload }) {
  switch (type) {
    case "Loading":
      return { ...prevState, loading: true, error: false, data: [] };

    case "Error":
      return {
        loading: false,
        error: true,
        data: [],
      };

    case "Success":
      return { ...prevState, loading: false, error: false, data: payload };

    default:
      return prevState;
  }
}

const Products = () => {
  const [state, dispatch] = useReducer(productReducer, {
    loading: false,
    error: false,
    data: [],
  });

  const [searchParam, setSearchParam] = useSearchParams();
  const [category, setCategory] = useState(
    searchParam.get("category") || "all"
  );
  const [price, setPrice] = useState("");
  // console.log(price);
  // console.log(searchParam.get("category"));
  async function getData() {
    let endpoint =
      category === "all" ? "/products" : `/products?category=${category}`;

    console.log(endpoint);
    dispatch({
      type: "Loading",
    });
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}${endpoint}`
      );

      const sortedData = data.sort((a, b) => {
        if (price === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });

      dispatch({
        type: "Success",
        payload: sortedData,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "Error",
      });
    }
  }

  useEffect(() => {
    setSearchParam((prevSearchParam) => {
      const newSearchParam = new URLSearchParams(prevSearchParam);
      // console.log(newSearchParam);

      newSearchParam.set("category", category);
      return newSearchParam;
    });
    getData();
  }, [category, price]);

  const { data, loading, error } = state;
  // console.log(data);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      {/* category */}
      <Box p={5}   display={"flex"} m={"auto"} w={"80%"} gap="10px">
        <Select m={"auto"}
          w={"20%"}
          
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="mens-clothing">mens-clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
          <option value="womens-clothing">womens-clothing</option>
        </Select>
        {/* price */}
        <Select
         m={"auto"}
          w={"20%"}
         
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="--">Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>
      </Box>
      <Box p={10} className={styles.grid}>
        {data.map((el) => (
          <ProductCard key={el.id} {...el} />
        ))}
      </Box>
      ;
    </>
  );
};

export default Products;
