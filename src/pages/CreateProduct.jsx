import React from "react";
import "../styles/createProduct.css";

import { useDispatch } from "react-redux";
import { createProduct } from "../redux/features/productSlice";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productImg, setProductImg] = React.useState("");
  const [formData, setFormData] = React.useState({
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
    if (!productImg) {
      return;
    }
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
      image: productImg,
    };

    const response = await dispatch(createProduct(values));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Product created");
    } else {
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/"
          onChange={handleImgChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name of the product"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="The brand"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="color"
          placeholder="The  color"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="quantity"
          placeholder="The quantity"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="sold"
          placeholder="number sold"
          onChange={handleChange}
        />
        <input
          type="number"
          name="regularPrice"
          placeholder="The regular price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="The price"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="short desription"
          onChange={handleChange}
          required
        />
        <button type="submit">Create</button>
      </form>
      <div className="imagePreview">
        {productImg ? (
          <img src={productImg} alt="image" />
        ) : (
          <p>Product Preview</p>
        )}
      </div>
      <MdArrowBack className="backArrow" onClick={() => navigate("/admin")} />
    </div>
  );
};

export default CreateProduct;
