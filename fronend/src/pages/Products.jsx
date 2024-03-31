import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Loading from '../components/Loading';
import Error from '../components/Error';
import ProductCard from "../components/ProductCard";
import styles from './products.module.css'

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

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    dispatch({
      type: "Loading",
    });
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products`
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

  const {data, loading, error} = state
  // console.log(data);

  if(loading){
    return <Loading/>
  }
  

  if(error){
    return <Error/>
  }


  return <div className={styles.grid}>
    
    {data.map(el=> (
      <ProductCard key={el.id} {...el}/>
    ))}
    
    </div>;
};

export default Products;
