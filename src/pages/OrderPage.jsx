import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/order.css";
import { getOrders } from "../redux/features/orderSlice";
import moment from "moment";
import RingLoader from "../components/RingLoader";

const OrderPage = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const { user, isLoading } = useSelector((state) => state.user);

  const getMyOrders = async () => {
    const response = await dispatch(getOrders());
    if (response?.payload) {
      setOrders(response.payload); // Set orders if response payload exists
    } else {
      setOrders([]); // Fallback to empty array if no payload
    }
  };

  useEffect(() => {
    getMyOrders();
  }, [dispatch, user]); // Added user and dispatch to dependency

  if (isLoading) {
    return (
      <div className="loading">
        <RingLoader />
      </div>
    );
  }

  return (
    <div className="ordersContainer">
      <h2>My Orders</h2>
      {orders.length === 0 ? ( // Conditional rendering for loading or empty state
        <p className="noOrder">No orders found</p>
      ) : (
        orders.map((order) => (
          <div className="orderContainer" key={order._id}>
            <div className="product">
              <p>Created At: {moment(order.createdAt).format("LL")}</p>
              {order.productDetails.map((product, index) => {
                return (
                  <div className="productDetail" key={index}>
                    <span>{product.name}</span>
                    <span>{product.price}</span>
                    <span>{product.quantity}</span>
                  </div>
                );
              })}
              <p>{order.payment_status}</p>
              <div className="address">
                <p>
                  Country: <span>{order.address.country}</span>
                </p>
                <p>
                  State: <span>{order.address.state}</span>
                </p>
                <p>
                  Address: <span>{order.address.line1}</span>,
                  <span>{order.address.line2}</span>,{" "}
                  <span>{order.address.city}</span>
                </p>
              </div>
              <div className="total">
                <p>
                  Total: <span>{order.amount_total}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
