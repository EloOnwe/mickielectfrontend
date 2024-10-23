import { Link, useNavigate } from "react-router-dom";
import "../styles/carouselItem.css";

import bulb from "../assets/bulbNew.jpg";
import microwave from "../assets/microwave2.jpg";
import industrialFan from "../assets/IndFan.jpg";
import secureLight from "../assets/secureLight.jpg";
import extention from "../assets/extention.jpg";
import wallbracket from "../assets/wallbracket.jpg";
import Switch from "../assets/switch.jpg";
import Lampholder from "../assets/lampholder.jpg";

export const productData = [
  {
    id: 1,
    imageurl: bulb,
    name: "Fancy bulb",
    price: "#25.99",
    description: "Fancy Multi Colour Pendant Light With Music",
  },
  {
    id: 2,
    imageurl: microwave,
    name: "Microwave",
    price: "#180,000",
    description: "Microwave with temperatur guage",
  },
  {
    id: 3,
    imageurl: industrialFan,
    name: "Industrial Fan",
    price: "#129.900",
    description: "Ox 26 Inch Industrial Standing Fan",
  },
  {
    id: 4,
    imageurl: secureLight,
    name: "Security Light",
    price: "#42000.99",
    description: "2w Tv Anti-Burglar Home Security Device",
  },
  {
    id: 5,
    imageurl: extention,
    name: "Extention",
    price: "#14000.99",
    description: "Extention SOCKET With USB PORT",
  },
  {
    id: 6,
    imageurl: wallbracket,
    name: "Wall Bracket",
    price: "#3990.99",
    description: "14'- 42' TV Wall Mount Bracket Holder For  TV",
  },
  {
    id: 7,
    imageurl: Switch,
    name: "Digital Switch",
    price: "#15000",
    description: "Digital Programmable Timer Plug-in Switch Electrical Timer",
  },
  {
    id: 8,
    imageurl: Lampholder,
    name: "Lampholder",
    price: "$49.99",
    description: "Heat Wall 220V Adapter Lamp Lampholder ",
  },
];

const CarouselItem = ({ url, name, price, description, id }) => {
  const navigate = useNavigate();

  return (
    <div className="carouselItem">
      <div className="carousel-image-container">
        <Link to={`/product/${id}`}>
          <img src={url} alt="product image" className="carousel-image" />
        </Link>
      </div>
      <div className="items">
        <h3>{name}</h3>
        <p>${price}</p>
        <div className="desc">
          <p>{description}</p>
        </div>
      </div>
      <button onClick={() => navigate(`/product/${id}`)}>Shop Now</button>
    </div>
  );
};

export default CarouselItem;
