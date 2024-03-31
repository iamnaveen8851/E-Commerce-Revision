import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import ProductCard from "../components/ProductCard";
import styles from "./products.module.css";
import { useSearchParams } from "react-router-dom";

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
  // console.log(searchParam.get("category"));
  async function getData() {
    const endpoint =
      category === "all" ? "/products" : `/products?category=${category}`;

    dispatch({
      type: "Loading",
    });
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}${endpoint}`
      );

      dispatch({
        type: "Success",
        payload: data,
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
    getData(category);
  }, [category]);

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
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="mens-clothing">mens-clothing</option>
        <option value="jewelery">jewelery</option>
        <option value="electronics">electronics</option>
        <option value="womens-clothing">womens-clothing</option>
      </select>
      <div className={styles.grid}>
        {data.map((el) => (
          <ProductCard key={el.id} {...el} />
        ))}
      </div>
      ;
    </>
  );
};

export default Products;
