// /* eslint-disable object-curly-newline*/

"use client";

import PropTypes from "prop-types";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import featuredEventsData from "./data";

const FeaturedEventsSlider = ({ className = "" }) => {
  if (!featuredEventsData || featuredEventsData.length === 0) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section
      className="p-5 py-6 md:py-10 w-full max-h-2xl mx-auto"
    >
      <p className="px-3 py-1 text-3xl mx-auto md:mx-16 uppercase w-fit font-montserrat font-black border-lightish-gray">
        Featured Events
      </p>
      <div className="container mx-auto">
        <Slider {...settings}>
          {featuredEventsData.map((event) => (
            <div
              key={event.id}
              className="flex flex-col p-4 bg-gray-100 rounded-xl md:flex-row items-center justify-center text-center md:text-left gap-10 max-h-[800px]"
            >
              <div className="md:w-full max-w-[70vw] mx-auto rounded-xl">
                <Image
                  src={event.image}
                  alt={event.alt}
                  width={800}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                  style={{ height: "60%", width: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center items-center mx-auto text-center md:text-left px-2 md:px-4">
                <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
                  {event.heading}
                </h2>
                <p className="text-lg md:text-xl mb-2">{event.description}</p>
                <a
                  href={event.buttonLink}
                  className="bg-primary hover:bg-primary-dark text-white hover:bg-blue-500 bg-blue-700 py-2 px-6 rounded-full transition-all duration-300"
                >
                  {event.buttonText}
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

FeaturedEventsSlider.propTypes = { className: PropTypes.string };

export default FeaturedEventsSlider;
