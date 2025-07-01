/* eslint-disable object-curly-newline */
import { FiArrowUpRight } from "react-icons/fi";
import { PropTypes } from "prop-types";
const IncubateCard = ({ eachIncubate }) => {
  return (
    <div className="flex flex-col justify-center items-start transition ease-linear mx-2 md:mx-0">
      <p className="font-montserrat font-black text-black text-4xl">
        {eachIncubate.title}
      </p>
      <p className="text-tertiary-gray text-lg mt-5">
        {eachIncubate.description}
      </p>
      <button className="bg-black h-12 px-6 mt-8 font-semibold text-base text-white flex items-center gap-x-2">
        Visit Us <FiArrowUpRight />
      </button>
      <p className="w-full max-w-xl border-b py-2 border-ash-gray mt-8 flex justify-between items-center">
        <span className="text-medium-dark-gray">Service</span>
        <span>{eachIncubate.serviceType}</span>
      </p>
      <p className="w-full max-w-xl border-b py-2 border-ash-gray text-black flex justify-between items-center">
        <span className="text-medium-dark-gray">Founder</span>
        <span>{eachIncubate.founder}</span>
      </p>
      <div className="flex items-center gap-x-4 mt-8">
        {eachIncubate.linkdine}
        <img
          src={eachIncubate.companyImageUrl}
          alt="comapny-icon"
          className="h-9 border border-ash-gray rounded-md"
        />
      </div>
    </div>
  );
};

IncubateCard.propTypes = {
  eachIncubate: PropTypes.object,
};

export default IncubateCard;
