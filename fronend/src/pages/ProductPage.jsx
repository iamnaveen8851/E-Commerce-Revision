import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { productReducer } from "./Products";
import styles from './productPage.module.css'

const ProductPage = () => {
  const { product_id } = useParams();
  const [state, dispatch] = useReducer(productReducer, {
    loading: false,
    error: false,
    data: {},
  });

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    dispatch({
      type: "Loading",
    });
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/${product_id}`
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

  const { data, loading, error } = state;
  const {id, title,image, price, rating, description} = data


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return <div className={styles.flex}>
    <div><img src={image} alt={title} /></div>
    <div>
      <h3>{title}</h3>
      <h3>Rating:{rating?.rate}</h3>
      <h3>Price:{price}</h3>
      <p>{description}</p>
      <button>BUY ITEM</button>
    </div>
  </div>;
};

export default ProductPage;
