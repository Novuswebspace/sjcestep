/* eslint-disable object-curly-newline*/
import { PropTypes } from "prop-types";
import React from "react";

const ImageFrame = ({ theme, data, img }) => {
  return (
    <p
      className={`${theme === "light" ? "border-1.5 text-black font-semibold" : "bg-light-dark text-white"} capitalize flex items-center gap-x-1 px-1.5 h-8 text-sm`}
    >
      {img && <img src={img} alt="image" />}
      {data}
    </p>
  );
};

export default ImageFrame;

ImageFrame.propTypes = {
  theme: PropTypes.string,
  data: PropTypes.string,
  img: PropTypes.string,
};
