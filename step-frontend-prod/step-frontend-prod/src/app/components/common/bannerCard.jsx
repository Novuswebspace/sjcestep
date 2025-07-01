/* eslint-disable object-curly-newline*/
import { PropTypes } from "prop-types";
import React from "react";
import HeaderText from "./headerText";

const BannerCard = ({ item, textPosition }) => {
  return (
    <>
      {item?.heading && <HeaderText title={item?.heading} />}
      <p
        className={`font-montserrat ${textPosition} md:leading-[3.5rem] uppercase mt-3 text-2xl md:text-5xl text-primary-black font-black`}
      >
        {item?.title}
      </p>
      <p
        className={`font-normal ${textPosition} text-tertiary-gray text-xl mt-6`}
      >
        {item?.desc}
      </p>
    </>
  );
};

export default BannerCard;

BannerCard.propTypes = {
  item: PropTypes.object,
  textPosition: PropTypes.string,
};
