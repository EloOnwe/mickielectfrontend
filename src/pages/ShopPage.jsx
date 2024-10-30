import "../../src/styles/shopPage.css";

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoHomeOutline, IoSpeedometer } from "react-icons/io5";
import {
  MdLocalLaundryService,
  MdOutlineElectricalServices,
} from "react-icons/md";
import { BsNintendoSwitch } from "react-icons/bs";
import { SiWire } from "react-icons/si";
import { TbSettingsAutomation } from "react-icons/tb";
import { RiPlug2Fill } from "react-icons/ri";
import { TiTimes } from "react-icons/ti";

import image1 from "../assets/siemens2.png";
import image2 from "../assets/lglogo.png";
import image3 from "../assets/amazon.webp";
import image4 from "../assets/samsunglogo.jpeg";
import image5 from "../assets/philipslogo.png";
import image6 from "../assets/smalogo.jpg";
import image7 from "../assets/belkinlogo.png";
import image8 from "../assets/sharklogo.png";
import image9 from "../assets/oralblogo.png";
import image10 from "../assets/jbllogo.png";

const imageData = [
  {
    image: image1,
    brand: "siemens",
  },
  {
    image: image2,
    brand: "LG",
  },
  {
    image: image3,
    brand: "amazon",
  },
  {
    image: image4,
    brand: "samsung",
  },
  {
    image: image5,
    brand: "Philips",
  },
  {
    image: image6,
    brand: "SMA",
  },
  {
    image: image7,
    brand: "Belkin",
  },
  {
    image: image8,
    brand: "shark",
  },
  {
    image: image9,
    brand: "Oral-b",
  },
  {
    image: image10,
    brand: "JBL",
  },
];

import Card from "../components/Card";
import { getAllProducts } from "../redux/features/productSlice";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const ShopPage = ({ handleFilterChange, productData }) => {
  const [showAsideMenu, setShowAsideMenu] = useState(false);
  const { isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleClicks = (category) => {
    handleFilterChange("category", category);
    setShowAsideMenu(false);
  };

  return (
    <div className="shop-container">
      <div className="shop-header">
        {showAsideMenu ? (
          <TiTimes
            className="aside-menu"
            onClick={() => setShowAsideMenu(false)}
          />
        ) : (
          <BiMenuAltLeft
            className="aside-menu"
            onClick={() => setShowAsideMenu(true)}
          />
        )}
        <nav>
          <div className="brand">
            <span onClick={() => handleFilterChange("brand", "All")}>
              Brand
            </span>
            <FaAngleUp className="angle up" />
            <FaAngleDown className="angle down" />
            <div className="brand-menu">
              <ul>
                {imageData.map((item, index) => {
                  const { image, brand } = item;
                  return (
                    <li key={index}>
                      <NavLink
                        onClick={() => handleFilterChange("brand", brand)}
                      >
                        <img src={image} alt={`brand ${index}`} />
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <Link to="/about">About Us</Link>
          <Link to="/enquiry">Enquiry</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faqs">FAQs</Link>
        </nav>
      </div>
      <section>
        <div className={showAsideMenu ? "aside-categories" : "categories"}>
          <div className="cat">
            <h2>Categories</h2>
          </div>
          <div className="category-links">
            {[
              { icon: IoHomeOutline, label: "All", category: "All" },
              {
                icon: IoHomeOutline,
                label: "Home Appliance",
                category: "Home Appliance",
              },
              {
                icon: MdLocalLaundryService,
                label: "Laundry Appliance",
                category: "Laundry Appliance",
              },
              {
                icon: MdOutlineElectricalServices,
                label: "Electrical Supply",
                category: "Electrical Supply",
              },
              {
                icon: BsNintendoSwitch,
                label: "Starters & Switches",
                category: "Starters & Switches",
              },
              {
                icon: SiWire,
                label: "Wires & Cables",
                category: "Wires & Cables",
              },
              {
                icon: TbSettingsAutomation,
                label: "Automation and Security",
                category: "Automation and Security",
              },
              { icon: IoSpeedometer, label: "Meters", category: "Meters" },
              {
                icon: RiPlug2Fill,
                label: "Accessories",
                category: "Accessories",
              },
            ].map(({ icon: Icon, label, category }, index) => (
              <div key={index}>
                <Icon className="icon" />
                <NavLink onClick={() => handleClicks(category)}>
                  {label}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="products-container">
          <>
            {isLoading ? (
              <div className="loading">
                <Loader />
              </div>
            ) : (
              <div className="products-container">
                {productData?.map((product) => (
                  <Card key={product._id} product={product} className="card" />
                ))}
              </div>
            )}
          </>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
