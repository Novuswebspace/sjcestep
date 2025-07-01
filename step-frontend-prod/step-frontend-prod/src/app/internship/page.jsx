/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable brace-style */
/* eslint-disable no-extra-parens */
/* eslint-disable multiline-ternary */

"use client";
import JobCard from "@/components/internship/jobCard";
import { internshipData } from "../components/internship/data";
import { Fragment, useEffect, useState } from "react";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import axios from "axios";
import { generateUrlEndpoint } from "../utils/generateUrlEndpoints";
import { motion } from "framer-motion";
import Loader from "../components/common/loaders/primaryLoader";
import Meta from "../components/common/Meta";
import DataLoader from "../components/common/loaders/dataLoader";
import { useQuery } from "@tanstack/react-query";

export default function Internship() {
  const [interData, setInternData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedLocation, setSelectedLocation] = useState("All");

  const fetchInternshipData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/internship?populate=*`
    );
    return data.data.attributes;
  };

  const { data: internshipHeading, isLoading } = useQuery({
    queryKey: ["internshipData"],
    queryFn: fetchInternshipData,
  });

  useEffect(() => {
    const fetchData = async () => {
      const urlEndpoint = generateUrlEndpoint(selectedLocation);

      try {
        setLoading(true);
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/${urlEndpoint}`
        );
        if (selectedLocation !== "All") {
          const filteredData = data.data.data.map((item) => ({
            ...item,
            attributes: {
              ...item.attributes,
              InternshipData: item.attributes.InternshipData.filter(
                (internship) => internship.place === selectedLocation
              ),
            },
          }));
          setInternData(filteredData);
          window.scrollTo({ top: 350, behavior: "smooth" });
        } else setInternData(data.data.data);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, [selectedLocation]);

  return (
    <PrimaryLayout>
      <Loader />
      <Meta
        title={`STEP Careers | Check out the current job openings at STEP`}
        description="An intensive workshop designed to equip aspiring entrepreneurs with the essential skills to launch their startups."
        keywords="Innovation, Brightest, Internship"
        ogTitle="STEP Careers | Check out the current job openings at STEP"
        ogDescription="An intensive workshop designed to equip aspiring entrepreneurs with the essential skills to launch their startups."
        ogUrl="https://www.sjcestep.in/internship"
        twitterTitle="STEP Careers | Check out the current job openings at STEP"
        twitterDescription="An intensive workshop designed to equip aspiring entrepreneurs with the essential skills to launch their startups."
      />
      {isLoading ? (
        <DataLoader />
      ) : (
        <main className="max-w-8xl mx-auto px-4 md:px-20">
          <div className="flex flex-col lg:flex-row md:items-start justify-between mt-16 md:mt-24 mb-9 md:mb-16">
            <div className="basis-[60%]">
              <p className="font-black text-primary-black text-3xl md:text-4xl uppercase font-montserrat text-wrap">
                {internshipHeading?.title}
              </p>
              <p className="text-lg md:text-xl font-normal text-tertiary-gray mt-5 text-wrap">
                {internshipHeading?.description}
              </p>
            </div>
            <div className="mt-12 md:mt-0 md:flex items-center gap-x-4">
              <span className="hidden md:block text-base text-tertiary-gray font-medium">
                Location:
              </span>
              <div className="relative">
                <img
                  src="/images/internship/location-on.svg"
                  alt="location marker"
                  className="absolute top-2.5 left-3"
                />
                <img
                  src="/images/internship/arrow-down.svg"
                  alt="location marker"
                  className="absolute top-2.5 right-3"
                />
                <select
                  value={selectedLocation}
                  onChange={(event) => setSelectedLocation(event.target.value)}
                  className="w-full rounded-md md:rounded-none internship-select border border-light-gray py-2.5 md:w-60 pl-10 appearance-none text-base font-medium text-primary-black focus:ring-4 ring-primary-violet shadow-sm focus:border-primary-violet focus:outline-none"
                >
                  <option value="All">All</option>
                  {internshipHeading?.Location?.map((option, index) => (
                    <option key={index} value={option.location}>
                      {option.location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr className="hidden md:block" />

          {!loading && (
            <>
              {interData.length > 0 ? (
                interData?.map((jobs, i) => (
                  <Fragment key={jobs.id}>
                    <section
                      className={`flex flex-col md:flex-row items-start justify-between mt-8 md:mt-12 ${i === interData.length - 1 ? "mb-16 md:mb-24" : "mb-5 md:mb-16"}`}
                    >
                      <div>
                        <h5 className="text-primary-black font-semibold text-lg md:text-xl">
                          {jobs?.attributes?.jobTitle}
                        </h5>
                        <p className="text-basefont-normal text-tertiary-gray mt-2.5">
                          {jobs?.attributes?.disclaimer}
                        </p>
                      </div>
                      {/* card */}
                      <ul className="flex flex-col gap-y-6 md:gap-y-8 basis-[65%] mt-4 md:mt-0">
                        {jobs?.attributes?.InternshipData?.map((item) => (
                          <motion.li
                            key={item.id}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "tween", stiffness: 300 }}
                          >
                            <JobCard id={jobs.attributes.slug} data={item} />
                          </motion.li>
                        ))}
                      </ul>
                    </section>
                    <hr
                      className={`hidden md:block ${i === internshipData.length - 1 ? "hidden" : "block"}`}
                    />
                  </Fragment>
                ))
              ) : (
                <p className="py-20 text-center text-2xl lg:text-5xl">
                  No data found
                </p>
              )}
            </>
          )}
          {loading && (
            <div className="h-full flex justify-center items-center">
              <img
                src="/images/loader/loader.gif"
                alt="loader"
                className="h-96"
              />
            </div>
          )}
        </main>
      )}
    </PrimaryLayout>
  );
}
