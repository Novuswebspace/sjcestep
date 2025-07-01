/* eslint-disable no-unused-vars */
import { Fragment } from "react";
import BulletTitleChip from "../common/bulletTitleChip";
import ImageTextChip from "./imageTextChip";
import { PropTypes } from "prop-types";
import Link from "next/link";

export default function JobCard({ data, id }) {
  return (
    <Link
      href={`/internship/${id}/?id=${data.id}`}
      className="border border-slate-300 px-5 pt-5 pb-6 block"
    >
      <div className="flex flex-col flex-wrap md:gap-2 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col xl:flex-row xl:items-center gap-2">
          <span className="text-lg font-semibold">{data.jobName}</span>
          <BulletTitleChip
            className="hidden w-fit md:flex"
            text={data.company}
            theme={"bg-primary-blue"}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
          <BulletTitleChip text={data.place} theme={"bg-light-blue-gray"} />
          <BulletTitleChip
            className="md:hidden w-fit"
            text={data.company}
            theme={"bg-light-blue-gray"}
          />
        </div>
      </div>
      <p className="text-base font-normal text-tertiary-gray mt-2.5">
        {data.jobDesc}
      </p>
      {/* details */}
      <div className="flex items-center gap-x-6 mt-8 flex-wrap gap-y-4 md:gap-y-0">
        <div className="text-base font-medium text-tertiary-gray flex items-center gap-x-2">
          <img src="/images/internship/schedule.svg" alt="image" />
          <span>{data.duration ? data.duration : "ND"}</span>
        </div>
        <div className="text-base font-medium text-tertiary-gray flex items-center gap-x-2">
          <img src="/images/internship/currency-rupee.svg" alt="rupee" />
          <span>{data.amount ? data.amount : "ND"}</span>
        </div>
        <div className="text-base font-medium text-tertiary-gray flex items-center gap-x-2">
          <img src="/images/internship/vaccancy-icon.svg" alt="vacncy" />
          <span>{data.vacancy ? data.vacancy : "ND"}</span>
        </div>
      </div>
    </Link>
  );
}

JobCard.propTypes = { data: PropTypes.obj, id: PropTypes.string };
