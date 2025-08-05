/* eslint-disable object-curly-newline*/
import { PropTypes } from "prop-types";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import ImageFrame from "../common/chips/imageFrame";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";

// Custom arrows for slider
function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", height: "100%" }}
            onClick={onClick}
        >
            <div className="h-full w-16 bg-white border border-extra-light-dark-gray flex justify-center items-center">
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
            <div className="h-full w-16 border bg-white border-extra-light-dark-gray flex justify-center items-center">
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

const FeaturedEventCard = ({ item }) => {
    return (
        <div className="px-2">
            <Link href={`/events/latest/${item.attributes.slug}`}>
                <article className="bg-white border border-secondary-gray rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-[300px] overflow-hidden">
                        <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            src={item?.attributes?.image?.data?.attributes?.url}
                            alt={item?.attributes?.alt ? item?.attributes?.alt : "featured-event-image"}
                            className="w-full hover:scale-[1.07] duration-300 h-full object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-x-4 mb-4">
                            <ImageFrame
                                data={item.attributes?.date}
                                img="/images/events/calendar.svg"
                            />
                            <ImageFrame
                                theme="light"
                                data={item.attributes?.place}
                                img="/images/events/location.svg"
                            />
                        </div>

                        <div className="flex justify-between items-center mb-3">
                            <p className="font-montserrat line-clamp-1 uppercase font-black text-lg">
                                {item.attributes?.title}
                            </p>
                            <FaArrowRight size={20} className="-rotate-45 flex-shrink-0" />
                        </div>

                        <p className="text-base line-clamp-2 text-tertiary-gray">
                            {item.attributes?.desc}
                        </p>
                    </div>
                </article>
            </Link>
        </div>
    );
};

const FeaturedEventsSlider = ({ featuredEvents }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    if (!featuredEvents || featuredEvents.length === 0) {
        return null;
    }

    return (
        <section className="bg-light-gray-sky py-16 md:py-24">
            <div className="px-4 md:px-20 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="font-medium px-3 py-1 text-sm bg-light-gray-sky border w-fit mx-auto border-lightish-gray">
                        Featured Events
                    </p>
                    <h2 className="font-montserrat font-black text-4xl mt-3">
                        Highlighted Events
                    </h2>
                    <p className="text-tertiary-gray text-lg mt-6 max-w-2xl mx-auto">
                        Discover our most important and upcoming events that you shouldn't miss
                    </p>
                </div>

                <div className="relative">
                    <Slider {...sliderSettings}>
                        {featuredEvents.map((item) => (
                            <FeaturedEventCard key={item.id} item={item} />
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

FeaturedEventsSlider.propTypes = {
    featuredEvents: PropTypes.array,
};

export default FeaturedEventsSlider; 