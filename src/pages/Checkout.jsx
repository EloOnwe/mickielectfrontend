import React, { useEffect } from "react";
import { clearCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/successPage.css";

import goodImage from "../assets/good.gif";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearCart());
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [clearCart, navigate]);

  return (
    <div className="successPage">
      <div className="message">
        <h1>Transaction successful!</h1>
        <h5>Thank you for your patronage.</h5>
      </div>
      <div className="background">
        <img src={goodImage} alt="good mark" />
      </div>
    </div>
  );
};

export default Checkout;
