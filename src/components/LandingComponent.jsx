import NewProductCarousel from "./NewProductCarousel";
import InfoBox from "./InfoBox";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { productData } from "./CarouselItem";
import CarouselItem from "./CarouselItem";
import FooterLinks from "./FooterLinks";
import { useSelector } from "react-redux";

import "../../src/styles/landingComponent.css";

import Loader from "./Loader";
import { useEffect, useState } from "react";

// Pre-define the carousel products using the imported productData
const carouselProducts = productData.map((product) => (
  <CarouselItem
    url={product.imageurl}
    name={product.name}
    price={product.price}
    description={product.description}
    key={product.id}
  />
));

// Define responsive breakpoints for the carousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const LandingComponent = () => {
  const [isOffline, setIsOffline] = useState(false);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  // Check if the browser is offline
  useEffect(() => {
    const handleOfflineStatus = () => {
      if (!navigator.onLine) {
        setIsOffline(true); // Set offline to true if no internet connection
      } else {
        setIsOffline(false); // Reset the status when back online
      }
    };

    window.addEventListener("offline", handleOfflineStatus);
    window.addEventListener("online", handleOfflineStatus);

    return () => {
      window.removeEventListener("offline", handleOfflineStatus);
      window.removeEventListener("online", handleOfflineStatus);
    };
  }, []);

  // Safely slice the data to avoid errors
  const slideData = products ? products.slice(0, 16) : [];

  // Map slideData to CarouselItems
  const items = slideData.map((product) => (
    <CarouselItem
      url={product.image}
      name={product.name}
      price={product.price}
      description={product.description}
      key={product._id}
      id={product._id}
    />
  ));

  return (
    <div className="landingPage">
      {isLoading ? (
        <div className="loading">
          <Loader />
        </div>
      ) : isOffline || isError ? (
        <div className="errorMessage">
          <div className="err">
            {isOffline ? (
              "No internet connection. Please check your network."
            ) : (
              <>
                <p>{message.err}</p>
                <p>{message.message}</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <NewProductCarousel />
          <InfoBox />
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="carousel"
          >
            {/* Render the items only if they are defined */}
            {items.length > 0 ? items : carouselProducts}
          </Carousel>
          <FooterLinks />
        </>
      )}
    </div>
  );
};
export default LandingComponent;
