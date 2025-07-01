/* eslint-disable object-curly-newline*/
import Image from "next/image";
import { PropTypes } from "prop-types";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const ProgramCard = ({ item, imageHeight }) => {
  return (
    <div>
      <div className={`${imageHeight} overflow-hidden`}>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={item?.attributes?.image?.data?.attributes?.url}
          alt={item?.attributes?.alt ? item?.attributes?.alt : "program-image"}
          className={`w-full h-full`}
        />
      </div>
      <div className="flex gap-x-2 justify-between items-center mt-4">
        <p className="font-montserrat line-clamp-1 uppercase font-black text-lg">
          {item?.attributes?.title}
        </p>
        <FaArrowRight size={20} className="-rotate-45 flex-shrink-0" />
      </div>
      <p className="font-normal line-clamp-2 mt-2 text-base text-tertiary-gray">
        {item?.attributes?.desc}
      </p>
    </div>
  );
};

export default ProgramCard;

ProgramCard.propTypes = {
  item: PropTypes.object,
  imageHeight: PropTypes.string,
};
