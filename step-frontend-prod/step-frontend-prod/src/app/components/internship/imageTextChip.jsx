import { PropTypes } from "prop-types";
export default function ImageTextChip({ imgUrl, text }) {
  return (
    <div className="text-base font-medium text-tertiary-gray flex items-center gap-x-2">
      <img src={imgUrl} alt={text} />
      <span>{text}</span>
    </div>
  );
}

ImageTextChip.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
