/* eslint-disable object-curly-newline*/
import { PropTypes } from "prop-types";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import ProfileCard from "./profileCard";
import Image from "next/image";

const BlogCard = ({ item, imageHeight }) => {
  return (
    <article>
      <div className={`${imageHeight} overflow-hidden`}>
        {item?.attributes?.image?.data?.attributes?.url && (
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={item?.attributes?.image?.data?.attributes?.url}
            className="w-full h-full object-cover hover:scale-[1.07] duration-300"
            alt={item?.attributes?.alt ? item?.attributes?.alt : "blog-image"}
          />
        )}
      </div>
      <div className="bg-darker-white mt-5 h-[30px] pr-[10px] border-1.5 pl-0.5 border-border-light-gray inline-flex items-center gap-x-2">
        <div className="text-xs bg-white px-1.5 py-0.5 border-1.5 border-border-light-gray font-medium">
          {item?.attributes?.blogTitle}
        </div>
        <p className="text-xs font-medium">{item?.attributes?.time}</p>
      </div>
      <div className="flex gap-x-2 justify-between items-center mt-4">
        <p className="font-montserrat line-clamp-1 uppercase font-black text-lg">
          {item?.attributes?.title}
        </p>
        <FiArrowUpRight className="text-lg flex-shrink-0" />
      </div>
      <p className="font-normal line-clamp-2 text-tertiary-gray text-base mt-2">
        {item?.attributes?.desc}
      </p>
      <div className="mt-6">
        <ProfileCard item={item?.attributes?.profile} data={item?.attributes} />
      </div>
    </article>
  );
};

export default BlogCard;

BlogCard.propTypes = {
  item: PropTypes.object,
  imageHeight: PropTypes.string,
};
