/* eslint-disable object-curly-newline*/
import { PropTypes } from "prop-types";

const Tab = ({ title, isActive, onClick }) => (
  <button
    className={`px-4 py-2 font-semibold transition-all duration-300 text-sm md:text-base border-b-2 ${
      isActive
        ? "text-blue-600 border-blue-600"
        : "text-gray-500 border-transparent hover:text-blue-600 hover:border-blue-300"
    }`}
    onClick={onClick}
    aria-selected={isActive}
    role="tab"
  >
    {title}
  </button>
);

export default Tab;

Tab.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.boolean,
  onClick: PropTypes.func,
};
