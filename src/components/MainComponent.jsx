import React from "react";
import { Routes, Route } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import SignUp from "../pages/SignUp";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import AdminPage from "../pages/AdminPage";
import CreateProduct from "../pages/CreateProduct";
import AllProducts from "../pages/AllProducts";
import AdminIndexPage from "../pages/AdminIndexPage";
import SinglePage from "../pages/SinglePage";
import Cart from "./Cart";
import Checkout from "../pages/Checkout";
import ProfilePage from "../pages/ProfilePage";
import OrderPage from "../pages/OrderPage";
import UpdateProducts from "../pages/UpdateProducts";
import About from "../pages/About";
import EnquiryPage from "../pages/EnquiryPage";
import Contact from "../pages/Contact";
import FAQS from "../pages/FAQS";

const MainComponent = ({ searchword, handleFilterChange, productData }) => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/shop"
            element={
              <ShopPage
                searchword={searchword}
                handleFilterChange={handleFilterChange}
                productData={productData}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminIndexPage />} />
            <Route path="createproduct" element={<CreateProduct />} />
            <Route path="allproducts" element={<AllProducts />}></Route>
          </Route>
          <Route path="/product/:id" element={<SinglePage />} />
          <Route path="/checkout-success" element={<Checkout />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/updateproducts/:id" element={<UpdateProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQS />} />
        </Routes>
      </main>
    </>
  );
};

export default MainComponent;
