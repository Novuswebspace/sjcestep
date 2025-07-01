/* eslint-disable object-curly-newline*/
import Link from "next/link";
import { PropTypes } from "prop-types";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const BlogHeader = ({ heading, description, path }) => {
  return (
    <div>
      <p className="text-4xl uppercase font-montserrat font-black">{heading}</p>
      <p className="mt-5 font-normal text-xl text-tertiary-gray">
        {description}
      </p>
      {path && (
        <div className="flex justify-end">
          {" "}
          <Link
            href={path ? path : "#"}
            className="mt-8 hidden md:flex items-center gap-x-3"
          >
            <p className="font-semibold text-lg">View All</p>
            <FaArrowRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogHeader;

BlogHeader.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
};
