import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { PropTypes } from "prop-types";

const CountUpItem = ({ number, title }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <li ref={ref} className="text-center">
      <p className="font-montserrat tabular-nums font-black text-40px">
        {inView && (
          <CountUp end={number} start={0} duration={3} separator="," />
        )}
        +
      </p>
      <p className="font-semibold text-primary-black text-lg mt-3">{title}</p>
    </li>
  );
};

export default CountUpItem;

CountUpItem.propTypes = { number: PropTypes.string, title: PropTypes.string };
