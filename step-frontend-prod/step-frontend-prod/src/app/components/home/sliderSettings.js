/* eslint-disable object-curly-newline */
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { PropTypes } from "prop-types";
// Custome arrows for slider
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", height: "100%" }}
      onClick={onClick}
    >
      <div className="h-full w-16 bg-white border border-extra-light-dark-gray  flex justify-center items-center">
        <IoArrowForward className="text-black text-xl" />
      </div>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", height: "100%" }}
      onClick={onClick}
    >
      <div className="h-full w-16 border bg-white border-extra-light-dark-gray  flex justify-center items-center">
        <IoArrowBack className="text-black text-xl" />
      </div>
    </div>
  );
}

NextArrow.propTypes = {
  className: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

PrevArrow.propTypes = {
  className: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        arrows: true,
      },
    },
  ],
};

export const settingsImpact = {
  dots: true,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 3000,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
};

export const facilitiesSetting = {
  dots: true,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 3000,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
};
