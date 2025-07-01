/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { sliderContent } from "./data";
import Slider from "react-slick";
import { PropTypes } from "prop-types";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { style, onClick } = props;

  return (
    <div
      style={{
        ...style,
        position: "absolute",
        color: "#3C3C3C",
        right: "0px",
        bottom: "-5px",
        zIndex: "50",
      }}
      onClick={onClick}
    >
      <div className="bg-darker-white h-10 w-10 flex justify-center items-center">
        <IoArrowForward className="text-black text-xl" />
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        position: "absolute",
        color: "#3C3C3C",
        left: "0px",
        bottom: "-5px",
        zIndex: "50",
      }}
      onClick={onClick}
    >
      <div className="bg-darker-white h-10 w-10 flex justify-center items-center">
        <IoArrowBack className="text-black text-xl" />
      </div>
    </div>
  );
}

const MilestoneCard = ({ sliderContent }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    vertical: true,
    speed: 1000,
    centerMode: true,
    arrows: false,
    centerPadding: "0px",
    focusOnSelect: true,
    slidesToShow: 7,
    pauseOnHover: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    // AfterChange: (current) => setActiveSlide(current),
    afterChange: (current) => setActiveSlide(current),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          vertical: false,
          arrows: true,
          slidesToShow: 3,
          swipeToSlide: true,
          verticalSwiping: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-24 gap-0 justify-center items-center pt-16 2xl:max-w-7xl max-w-6xl mx-auto">
        <div className="bg-light-gray-sky overflow-hidden order-2 md:order-none">
          <div className="col-span-1 pt-6 md:pt-0  md:text-xl text-base md:-mb-85px -mb-115px h-48 md:h-635px 2xl:h-600px xl:h-605px 3xl:h-605px lg:h-600px">
            <Slider {...settings}>
              {sliderContent?.map((content, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      activeSlide === index ? "text-black" : "text-gray-400"
                    }`}
                  >
                    <div className="!flex !flex-col !justify-center !items-center md:!-ml-10">
                      <p className="font-bold text-xl cursor-pointer">
                        {content.year}
                      </p>

                      <div>
                        {/* <TbMinusVertical className="block text-[40px] text-[#fafafade] mr-[10px] stretch-vertical my-2" /> */}
                        <hr className="w-2px hidden md:block h-12 bg-medium-ash-gray text-center border-0" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="md:-ml-20 col-span-3 order-1 md:order-none">
          <div className="journey-fade bg-light-gray-sky opacity-50 hidden md:flex flex-col md:flex-row gap-3 p-4">
            <img
              src={
                sliderContent[
                  activeSlide === 0 ? sliderContent.length - 1 : activeSlide - 1
                ]?.image?.data?.attributes?.url
              }
              alt="journey-image"
              className="object-cover md:h-20"
            />

            <div className="flex flex-col justify-start">
              <p className="font-bold text-base text-tertiary-gray">
                {
                  sliderContent[
                    activeSlide === 0
                      ? sliderContent.length - 1
                      : activeSlide - 1
                  ]?.year
                }
              </p>
              <p className="text-base text-black line-clamp-2">
                {
                  sliderContent[
                    activeSlide === 0
                      ? sliderContent.length - 1
                      : activeSlide - 1
                  ]?.title
                }
              </p>
            </div>
          </div>
          <div className="journey-fade bg-white flex flex-col md:flex-row gap-3 my-2 p-4 border border-light-ash-gray">
            <img
              src={sliderContent[activeSlide]?.image?.data?.attributes?.url}
              alt="journey-image"
              className="object-cover md:h-24"
            />
            <div className="flex flex-col justify-start">
              <p className="font-bold text-base text-tertiary-gray">
                {sliderContent[activeSlide]?.year}
              </p>
              <p className="text-base text-black line-clamp-2">
                {sliderContent[activeSlide]?.title}
              </p>
            </div>
          </div>
          <div className="journey-fade hidden bg-light-gray-sky opacity-50 md:flex flex-col md:flex-row gap-3 p-4">
            <img
              src={
                sliderContent[
                  activeSlide + 1 === sliderContent.length ? 0 : activeSlide + 1
                ]?.image?.data?.attributes?.url
              }
              alt="journey-image"
              className="object-cover md:h-20"
            />
            <div className="flex flex-col justify-start">
              <p className="font-bold text-base text-tertiary-gray">
                {
                  sliderContent[
                    activeSlide + 1 === sliderContent.length
                      ? 0
                      : activeSlide + 1
                  ]?.year
                }
              </p>
              <p className="text-base text-black line-clamp-2">
                {
                  sliderContent[
                    activeSlide + 1 === sliderContent.length
                      ? 0
                      : activeSlide + 1
                  ]?.title
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SamplePrevArrow.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};
SamplePrevArrow.defaultProps = { onClick: null, style: {} };
SampleNextArrow.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};
SampleNextArrow.defaultProps = { onClick: null, style: {} };

export default MilestoneCard;

MilestoneCard.propTypes = {
  sliderContent: PropTypes.array,
};
