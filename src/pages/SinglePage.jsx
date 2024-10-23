import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../redux/features/productSlice";
import { addToCart } from "../redux/features/cartSlice";
import { MdArrowBack } from "react-icons/md";

import "../styles/singlePage.css";
import RingLoader from "../components/RingLoader";

const SinglePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        dispatch(getSingleProduct(id));
      } catch (error) {
        console.error(error.message);
      }
    };
    getProduct();
  }, [id, dispatch]);

  const { product, isLoading } = useSelector((state) => state.product);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return (
      <div className="loading-box">
        <RingLoader />
      </div>
    );
  }

  return (
    <div className="single-page">
      <div className="single-page-image-container">
        <img src={product?.image} alt={product?.name} />
      </div>
      <div className="single-page-details">
        <h3>{product?.name}</h3>
        <p>${product?.price}</p>
        <p>
          <span>Brand: </span>
          {product?.brand}
        </p>
        <p>
          <span>Category: </span> {product?.category}
        </p>
        <p>{product?.description}</p>
      </div>
      <div className="single-page-btn">
        <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
      </div>
      <MdArrowBack className="backIcon" onClick={() => navigate("/shop")} />
    </div>
  );
};

export default SinglePage;
