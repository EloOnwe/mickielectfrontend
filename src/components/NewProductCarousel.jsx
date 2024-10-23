import { useEffect, useState } from "react";
import "../styles/newProductCarousel.css";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Slide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products } = useSelector((state) => state.product);
  const newData = products?.slice(0, 10);

  let slideLength = newData?.length - 1;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [currentSlide]);

  return (
    <div className="slider">
      <FaRegArrowAltCircleLeft className="arrow prev" onClick={prevSlide} />
      <FaRegArrowAltCircleRight className="arrow next" onClick={nextSlide} />
      {newData?.map((slide, index) => {
        const { name, image, description } = slide;
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="image" />
                <div className="content">
                  <span className="span1"></span>
                  <span className="span2"></span>
                  <span className="span3"></span>
                  <span className="span4"></span>
                  <h2>{name}</h2>
                  <p>{description}</p>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slide;
