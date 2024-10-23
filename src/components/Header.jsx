import React, { useEffect, useState } from "react";
import { BiCartDownload } from "react-icons/bi";
import { RiPlug2Fill, RiSearch2Line } from "react-icons/ri";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { getSingleUser, logOutUser } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { LiaTimesSolid } from "react-icons/lia";
import { BiMenuAltLeft } from "react-icons/bi";
import { TiTimes } from "react-icons/ti";
import { IoHomeOutline, IoSpeedometer } from "react-icons/io5";
import "../styles/header.css";
import {
  MdLocalLaundryService,
  MdOutlineElectricalServices,
} from "react-icons/md";
import { BsNintendoSwitch } from "react-icons/bs";
import { SiWire } from "react-icons/si";
import { TbSettingsAutomation } from "react-icons/tb";

const Header = ({ handleInputChange, handleFilterChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [showAsideLinks, setShowAsideLinks] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  // Fetch user details on component mount
  const getUser = async () => {
    await dispatch(getSingleUser());
  };

  const logout = async () => {
    const res = await dispatch(logOutUser());
    toast.success(res.payload.message);
    navigate("/");
    setShowMenu(false);
  };

  // Toggle the main menu visibility
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Toggle the aside links menu visibility
  const toggleAsideLinks = () => {
    setShowAsideLinks((prev) => !prev);
  };

  // Handle category filtering and navigate to shop
  const handleCategoryFilter = (category) => {
    handleFilterChange("category", category);
    toggleAsideLinks(); // Close the aside links
  };

  // Handle brand filtering and navigate to shop

  const handleBrandFilter = (brand) => {
    handleFilterChange("brand", brand);
    toggleAsideLinks();
  };

  // Fetch user details if logged in
  useEffect(() => {
    if (isLoggedIn) getUser();
  }, [isLoggedIn]);

  // Categories to display in the aside links
  const categories = [
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
    { icon: SiWire, label: "Wires & Cables", category: "Wires & Cables" },
    {
      icon: TbSettingsAutomation,
      label: "Automation and Security",
      category: "Automation and Security",
    },
    { icon: IoSpeedometer, label: "Meters", category: "Meters" },
    { icon: RiPlug2Fill, label: "Accessories", category: "Accessories" },
  ];

  return (
    <header>
      {/* Aside links for category filtering */}

      {showAsideLinks && (
        <div className="aside-links">
          <div className="title">
            <h2>Categories</h2>
          </div>
          <div className="left-categories">
            {categories.map(({ icon: Icon, label, category }, index) => (
              <div key={index}>
                <Icon className="icon" />
                <NavLink onClick={() => handleCategoryFilter(category)}>
                  {label}
                </NavLink>
              </div>
            ))}
            <div className="line"></div>
            <div className="brands">
              <h2>Brands</h2>
              <NavLink onClick={() => handleBrandFilter("All")}>All</NavLink>
              <NavLink onClick={() => handleBrandFilter("siemens")}>
                Siemens
              </NavLink>
              <NavLink onClick={() => handleBrandFilter("LG")}>LG</NavLink>
              <NavLink onClick={() => handleBrandFilter("amazon")}>
                Amazon
              </NavLink>
              <NavLink onClick={() => handleBrandFilter("samsung")}>
                Samsung
              </NavLink>
              <NavLink onClick={() => handleBrandFilter("philips")}>
                Philips
              </NavLink>
              <NavLink onClick={() => handleBrandFilter("SMA")}>SMA</NavLink>
              <NavLink onClick={() => handleBrandFilter("belkin")}>
                Belkin
              </NavLink>
              <NavLink onClick={() => handleBrandFilter("shark")}>
                Shark
              </NavLink>
              <NavLink onClick={() => handleBrandFilter("oral-b")}>
                ORAL-B
              </NavLink>
              <NavLink onClick={() => handleBrandFilter("JBL")}>JBL</NavLink>
              <div className="line"></div>
              <NavLink to={"/about"} onClick={toggleAsideLinks}>
                About Us
              </NavLink>
              <NavLink to="/enquiry" onClick={toggleAsideLinks}>
                Enquiry
              </NavLink>
              <NavLink to="/contact" onClick={toggleAsideLinks}>
                Contact Us
              </NavLink>
              <NavLink to="/faqs" onClick={toggleAsideLinks}>
                FAQS
              </NavLink>
            </div>
          </div>
        </div>
      )}

      <div className="logo-container">
        <NavLink to="/">
          <h1>Mickielect.</h1>
        </NavLink>
      </div>

      {/* Toggle aside links */}
      {showAsideLinks ? (
        <TiTimes className="aside-menu" onClick={() => toggleAsideLinks()} />
      ) : location.pathname === "/shop" ||
        location.pathname === "/about" ||
        location.pathname === "/contact" ||
        location.pathname === "/enquiry" ||
        location.pathname === "/faqs" ? (
        <BiMenuAltLeft
          className="aside-menu"
          onClick={() => toggleAsideLinks()}
        />
      ) : null}

      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Product"
          onChange={handleInputChange}
        />
        <div className="search-icon-container">
          <RiSearch2Line
            size={30}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/shop")}
          />
        </div>
      </div>

      {/* Main navigation menu */}
      <nav className={showMenu ? "navlinks" : ""}>
        <NavLink to="/shop" onClick={toggleMenu}>
          Shop
        </NavLink>
        {!isLoggedIn && (
          <NavLink to="/signup" onClick={toggleMenu}>
            Sign Up
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink to="/signin" onClick={toggleMenu}>
            Sign In
          </NavLink>
        )}
        {isLoggedIn && <NavLink onClick={logout}>Logout</NavLink>}
        {isLoggedIn && user?.role === "admin" && (
          <NavLink to="/admin">Admin</NavLink>
        )}
        {isLoggedIn && (
          <div className="infos">
            <span>Hi {user?.username}</span>
            <div className="profile-icon">
              {user?.photo ? (
                <img src={user.photo} alt="profile" className="headerImg" />
              ) : (
                <CgProfile size={27} />
              )}
              <div className="my-info">
                <Link to="/profile" onClick={() => toggleMenu()}>
                  Profile
                </Link>
                <Link to="/order" onClick={() => toggleMenu()}>
                  Order
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="cart" onClick={() => navigate("/cart")}>
        <BiCartDownload size={30} />
        <p>{cartItems.length}</p>
        <span>Cart</span>
      </div>

      {/* Hamburger menu */}
      <div className="ham">
        {showMenu ? (
          <LiaTimesSolid
            onClick={toggleMenu}
            size={25}
            className="menu-right"
          />
        ) : (
          <GiHamburgerMenu
            size={25}
            onClick={toggleMenu}
            className="menu-right"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
