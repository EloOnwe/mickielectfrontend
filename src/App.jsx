import axios from "axios";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainComponent from "./components/MainComponent";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus } from "./redux/features/userSlice";
import { getAllProducts } from "./redux/features/productSlice";

function App() {
  const { products } = useSelector((state) => state.product);

  const [searchword, setSearchword] = useState(null);
  const [filters, setFilters] = useState({ category: "", brand: "" });
  const [productData, setProductData] = useState(products);

  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginStatus());
  }, []);

  const handleInputChange = (e) => {
    setSearchword(e.target.value);
  };

  useEffect(() => {
    const filterProducts = () => {
      let filteredProducts = products;

      // Filter by searchword if provided
      if (searchword) {
        filteredProducts = filteredProducts?.filter((product) =>
          product.name.toLowerCase().includes(searchword.toLowerCase())
        );
      }

      // Check for category filtering, only apply if category is not "All"
      if (filters.category && filters.category.toLowerCase() !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      // Check for brand filtering, only apply if brand is not "All"
      if (filters.brand && filters.brand.toLowerCase() !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.brand.toLowerCase() === filters.brand.toLowerCase()
        );
      }

      // Set the filtered products to the state
      setProductData(filteredProducts);
    };

    filterProducts();
  }, [searchword, filters, products]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Header
        handleInputChange={handleInputChange}
        handleFilterChange={handleFilterChange}
      />
      <MainComponent
        searchword={searchword}
        handleFilterChange={handleFilterChange}
        productData={productData}
      />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
