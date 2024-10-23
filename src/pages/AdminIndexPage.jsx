import React from "react";
import "../styles/adminIndexPage.css";

import image from "../assets/home.jpg";
import { useSelector } from "react-redux";

const AdminIndexPage = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="adminIndex">
      <img src={image} alt="image" />
      <h1>Welcome : {user?.username} </h1>
    </div>
  );
};

export default AdminIndexPage;
