/* eslint-disable object-curly-newline*/
import { PropTypes } from "prop-types";
import React from "react";

const HeaderText = ({ title }) => {
  return (
    <p className="bg-light-gray-sky inline text-center capitalize border px-3 py-1 font-medium text-sm">
      {title}
    </p>
  );
};

export default HeaderText;

HeaderText.propTypes = {
  title: PropTypes.string,
};
