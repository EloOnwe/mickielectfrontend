import React from "react";
import "../../src/styles/infoBox.css";

import {
  BsCartCheck,
  BsClockHistory,
  BsFillCreditCardFill,
} from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";

const data = [
  {
    icon: <FaShippingFast size={30} color="#8cb4f5" />,
    heading: "Free Transportation",
    text: "We offer free shipping on special products",
  },
  {
    icon: <BsFillCreditCardFill size={30} color="#f7d272" />,
    heading: "Secure Payment",
    text: "Make secure payment for your product.",
  },
  {
    icon: <BsCartCheck size={30} color="#fa82ea" />,
    heading: "Quality Products",
    text: "We sell products from only tested and proven brands.",
  },
  {
    icon: <BsClockHistory size={30} color="#82fa9e" />,
    heading: "24/7 Support",
    text: "Get access to support from our exprt support team.",
  },
];

const InfoBox = () => {
  return (
    <div className="infoboxes ">
      {data.map((item, index) => {
        return (
          <div className="infobox" key={index}>
            <div className="icon">{item.icon}</div>
            <div className="text">
              <h4>{item.heading}</h4>
              <p className="p-text">{item.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoBox;
