import React from "react";
import { useDispatch } from "react-redux";

import "../styles/card.css";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/features/cartSlice";

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="card-container">
      <img
        src={product.image}
        alt="transformer"
        onClick={() => navigate(`/product/${product._id}`)}
      />
      <div className="details">
        <h5>{product.name}</h5>
        <p>Price: #{product.price}</p>
        <p>Brand: {product.brand}</p>
        <p>Ratings: {product.ratings}</p>
      </div>
      <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
    </div>
  );
};

export default Card;
