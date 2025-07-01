import { PropTypes } from "prop-types";

export default function BulletTitleChip({ text, theme, className }) {
  return (
    <div
      className={`border px-2 py-0.5 md:py-0 flex items-center gap-x-1.5 ${className}`}
    >
      <button className={`h-1.5 w-1.5 rounded-full ${theme}`} />
      <span className="text-xs md:text-sm font-medium text-extra-light-dark">
        {text}
      </span>
    </div>
  );
}

BulletTitleChip.propTypes = {
  text: PropTypes.string,
  theme: PropTypes.string,
  className: PropTypes.string,
};
