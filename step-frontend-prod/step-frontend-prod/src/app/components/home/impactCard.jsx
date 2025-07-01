import { PropTypes } from "prop-types";
// Import Link from "next/link";

const ImpactCard = ({ eachImapact, classname = "" }) => {
  return (
    <li
      className={`${classname} bg-light-gray-sky rounded-sm flex flex-col justify-start p-6`}
    >
      <img
        src={eachImapact?.image?.data?.attributes?.url}
        alt={"icon"}
        className="w-10 h-10"
      />
      <div className="mt-16 flex flex-col justify-start">
        <p className="font-montserrat uppercase font-extrabold text-lg">
          {eachImapact.title}
        </p>
        <p className="text-base text-tertiary-gray mt-2">
          {eachImapact.description}
        </p>
      </div>
      {/* <div className="flex items-end grow mt-6">
        <Link href="#" className="font-semibold">
          {eachImapact.link}
        </Link>
      </div> */}
    </li>
  );
};

ImpactCard.propTypes = {
  eachImapact: PropTypes.object,
  classname: PropTypes.string,
};

export default ImpactCard;
