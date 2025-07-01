/* eslint-disable object-curly-newline*/
import { PropTypes } from "prop-types";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import ImageFrame from "../common/chips/imageFrame";
import Image from "next/image";

const EventCard = ({ item, imageHeight }) => {
  return (
    <article>
      <div className={`overflow-hidden ${imageHeight}`}>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={item?.attributes?.image?.data?.attributes?.url}
          alt={item?.attributes?.alt ? item?.attributes?.alt : "event-images"}
          className={`w-full hover:scale-[1.07] duration-300 h-full`}
        />
      </div>
      <div className="mt-5 flex items-center gap-x-4">
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

      {/* arrow */}
      <div className="flex justify-between items-center mt-4">
        <p className="font-montserrat line-clamp-1 uppercase font-black text-lg">
          {item.attributes?.title}
        </p>
        <FaArrowRight size={20} className="-rotate-45 flex-shrink-0" />
      </div>

      {/* description */}
      <p className="text-base mt-2 line-clamp-2 md:line-clamp-3 text-tertiary-gray">
        {item.attributes?.desc}
      </p>
    </article>
  );
};

export default EventCard;

EventCard.propTypes = {
  item: PropTypes.object,
  imageHeight: PropTypes.string,
};
