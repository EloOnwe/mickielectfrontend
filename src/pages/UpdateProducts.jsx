import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getSingleProduct,
  updateProductData,
} from "../redux/features/productSlice";
import "../styles/updateProduct.css";
import { toast } from "react-toastify";

const UpdateProducts = () => {
  const { product, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [productImg, setProductImg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    brand: "",
    color: "",
    quantity: "",
    sold: "",
    regularPrice: "",
    price: "",
    description: "",
  });

  // Fetch product on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(getSingleProduct(id));
    };
    fetchProduct();
  }, [dispatch, id]);

  // Update formData when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        sku: product.sku || "",
        category: product.category || "",
        brand: product.brand || "",
        color: product.color || "",
        quantity: product.quantity || "",
        sold: product.sold || "",
        regularPrice: product.regularPrice || "",
        price: product.price || "",
        description: product.description || "",
      });
      setProductImg(product.image || "");
    }
  }, [product]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = {
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      brand: formData.brand,
      color: formData.color,
      quantity: formData.quantity,
      sold: formData.sold,
      regularPrice: formData.regularPrice,
      price: formData.price,
      description: formData.description,
      image: productImg || product.image,
      _id: id,
    };

    const response = await dispatch(updateProductData(values));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Product Updated");
    } else {
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="productContainer">
      <form onSubmit={handleSubmit}>
        <div className="productImage">
          {productImg ? (
            <img src={productImg} alt="" />
          ) : (
            <img src={product?.image} alt="" />
          )}

          <input type="file" accept="image/*" onChange={handleImgChange} />
        </div>
        <div className="details">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name of the product"
            onChange={handleChange}
            required
          />
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            placeholder="SKU"
            onChange={handleChange}
            disabled
          />
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            placeholder="Category"
            onChange={handleChange}
            required
          />
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            placeholder="The brand"
            onChange={handleChange}
            required
          />
          <label htmlFor="color">Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            placeholder="The color"
            onChange={handleChange}
            required
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            placeholder="The quantity"
            onChange={handleChange}
            required
          />
          <label htmlFor="sold">Sold</label>
          <input
            type="number"
            name="sold"
            value={formData.sold}
            placeholder="Number sold"
            onChange={handleChange}
          />
          <label htmlFor="regularPrice">Regular Price</label>
          <input
            type="number"
            name="regularPrice"
            value={formData.regularPrice}
            placeholder="The regular price"
            onChange={handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            placeholder="The price"
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            placeholder="Short description"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLoading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
};

export default UpdateProducts;
