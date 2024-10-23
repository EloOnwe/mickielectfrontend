import React from "react";
import "../../src/styles/productCategoryCarousel.css";

import { useNavigate } from "react-router-dom";

import cable from "../assets/cable.jpg";
import transformers from "../assets/bktransformer.jpg";
import Light from "../assets/secureLight.jpg";

const categories = [
  {
    id: 1,
    category: "Cables",
    image: cable,
  },
  {
    id: 2,
    category: "Transformers",
    image: transformers,
  },
  {
    id: 3,
    category: "Searchlights",
    image: Light,
  },
];

const Category = ({ category, image }) => {
  const navigate = useNavigate();
  return (
    <div className="category">
      <h2>{category}</h2>
      <img src={image} alt="img" />
      <button className="btn" onClick={() => navigate("/shop")}>
        {"Shop Now >>>"}
      </button>
    </div>
  );
};

const ProductCategory = () => {
  return (
    <div className="categories">
      {categories.map((prodItem) => {
        return (
          <div key={prodItem.id} className="cat">
            <Category category={prodItem.category} image={prodItem.image} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategory;
