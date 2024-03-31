import React from 'react'
import styles from './productCard.module.css'
import {useNavigate} from 'react-router-dom'
const ProductCard = ({id, title,image, price, rating }) => {
const navigate = useNavigate()
  return (
    <div className={styles.card} style={{display :"flex"}}>
      <div><img src={image} alt={title} /></div>
      <div>
        <h3>{title}</h3>
        <h3>Rs. {price}</h3>
        <h3>{rating.rate} stars</h3>
        <button onClick={()=> navigate(`/products/${id}`)}>View Details</button>
        <button>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard
