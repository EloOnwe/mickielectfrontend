import { useSelector, useDispatch } from "react-redux";
import "../styles/cart.css";
import { FaArrowLeft } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import {
  clearCart,
  decreaseProductQty,
  getGrandTotal,
  increaseProductQty,
  removeFromCart,
} from "../redux/features/cartSlice";
import { useEffect } from "react";
import axios from "axios";

const backendApiUrl = import.meta.env.VITE_APP_BACKEND_URL;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, grandTotal } = useSelector((state) => state.cart);
  const { isLoggedIn, user } = useSelector((state) => state.user);

  // Recalculate the grand total whenever cart items change
  useEffect(() => {
    dispatch(getGrandTotal());
  }, [dispatch, cartItems]);

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleIncProductQty = (item) => {
    dispatch(increaseProductQty(item));
  };

  const handleDecProductQty = (item) => {
    dispatch(decreaseProductQty(item));
  };

  // Placeholder for clear cart functionality
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${backendApiUrl}/create-checkout-session`,
        {
          cartItems,
          userId: user._id,
        }
      );

      if (response.data) {
        window.location.href = response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cart-container">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div className="item-container" key={item._id}>
            <div className="image-container">
              <div className="image">
                <img src={item.image} alt={item.name} />
                <h6>{item.name}</h6>
              </div>
              <div className="remove-btn">
                <button onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
            <div className="quantity-container">
              <button className="btn" onClick={() => handleDecProductQty(item)}>
                -
              </button>
              <h4>{item.productQty}</h4>
              <button className="btn" onClick={() => handleIncProductQty(item)}>
                +
              </button>
            </div>

            <div className="total">
              <span>Unit price: </span>
              <span>
                <TbCurrencyNaira />
              </span>
              <span>{item.price}</span>
            </div>
            <div className="total">
              <span>Total: </span>
              <TbCurrencyNaira />
              <span>{item.price * item.productQty}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-cart">
          <p>The cart is currently empty</p>
          <Link to="/shop">
            <FaArrowLeft size={28} />
            Start Shopping
          </Link>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="summary">
          <button id="clear" onClick={handleClearCart}>
            Clear Cart
          </button>
          <div className="summary-right">
            <div className="grandTotal-container">
              <p className="grandTotal">
                <span>Grand Total: </span>
                <TbCurrencyNaira /> {grandTotal}
              </p>
            </div>
            <button
              className="checkout"
              onClick={
                isLoggedIn ? () => handleCheckout() : () => navigate("/signin")
              }
            >
              {isLoggedIn ? "Checkout" : "Login to checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
