/* eslint-disable object-curly-newline*/
/* eslint-disable multiline-ternary*/
import { PropTypes } from "prop-types";
import React from "react";

const ProfileCard = ({ item, data }) => {
  return (
    <div className="flex items-center gap-x-3">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        {item?.data?.attributes?.url ? (
          <img
            src={item?.data?.attributes?.url}
            className="w-full h-full object-cover"
            alt="profile"
          />
        ) : (
          <img
            src={`/images/home/profile-logo.svg`}
            alt={"profile"}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-primary-black">{data?.name}</p>
        <p className="text-tertiary-gray text-sm font-normal">{data?.Date}</p>
      </div>
    </div>
  );
};

export default ProfileCard;

ProfileCard.propTypes = {
  item: PropTypes.object,
  data: PropTypes.object,
};
