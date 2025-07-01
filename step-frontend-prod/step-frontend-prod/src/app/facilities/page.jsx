/* eslint-disable no-undef */
/* eslint-disable brace-style */
/* eslint-disable multiline-ternary */

"use client";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/common/loaders/primaryLoader";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { facilitiesSetting } from "../components/home/sliderSettings";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Meta from "../components/common/Meta";
import DonateModal from "../components/facilities/donateModal";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../components/common/loaders/dataLoader";

const Facilities = () => {
  const [open, setOpen] = useState(false);

  // FacilitiesData fetching
  const fetchFacilityData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/facility-single?populate=*`
    );
    return data.data.attributes;
  };

  const { data: facilitiesData, isLoading } = useQuery({
    queryKey: ["facility-Data-collection"],
    queryFn: fetchFacilityData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  // Facilities image
  const fetchFacilitiesData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/facilities?populate=*`
    );
    return data.data;
  };

  const { data: facilitiesImage } = useQuery({
    queryKey: ["facilitiesData-Details"],
    queryFn: fetchFacilitiesData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  return (
    <PrimaryLayout footerColor={true}>
      <Loader />

      <Meta
        title={`STEP: Everything you wanted to know about our facilities`}
        description="Discover our state-of-the-art facilities designed to enhance your experience."
        keywords="facilities, amenities, state-of-the-art, experience"
        ogTitle="STEP: Everything you wanted to know about our facilities"
        ogDescription="Discover our state-of-the-art facilities designed to enhance your experience."
        ogUrl="https://www.sjcestep.in/facilities"
        twitterTitle="STEP: Everything you wanted to know about our facilities"
        twitterDescription="Discover our state-of-the-art facilities designed to enhance your experience."
      />
      {isLoading ? (
        <DataLoader />
      ) : (
        <section>
          {/* Facilities section start */}
          <section className="bg-white px-4 lg:px-20 md:py-24 mt-16 md:mt-0">
            <section className="max-w-7xl md:mx-auto">
              <div className="flex flex-col md:items-center">
                <p className="font-medium px-3 py-1 text-sm bg-light-gray-sky border w-fit border-lightish-gray">
                  {facilitiesData?.facilitiesFrame}
                </p>
                <p className="font-montserrat font-black uppercase text-4xl mt-3">
                  {facilitiesData?.facilitiesTitle}
                </p>
                <p className="text-tertiary-gray md:text-center text-xl mt-6 max-w-3xl">
                  {facilitiesData?.facilitiesDesc}
                </p>
              </div>

              {/* facilities images mobile */}
              <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-x-7 gap-y-10 mt-16">
                {facilitiesImage?.map((each, index) => (
                  <div key={index}>
                    <div className="h-[315px] overflow-hidden">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        src={each?.attributes?.image?.data?.attributes?.url}
                        alt={
                          each.attributes.alt
                            ? each.attributes.alt
                            : "facilities"
                        }
                        className="object-cover hover:scale-[1.07] duration-300 w-full h-full"
                      />
                    </div>
                    <div className="w-full bg-white py-4">
                      <img
                        src={each?.attributes?.icon?.data?.attributes?.url}
                        alt="icon"
                      />
                      <div className="mt-2">
                        <p className="font-montserrat uppercase font-black text-lg">
                          {each.attributes.title}
                        </p>
                      </div>
                      <p className="font-normal text-tertiary-gray text-sm">
                        {each.attributes.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* facilities slider images mobile */}
              <div className="mt-16 md:hidden">
                <Slider {...facilitiesSetting}>
                  {facilitiesImage?.map((each, index) => (
                    <div key={index}>
                      <div className="h-[315px] overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.07 }}
                          transition={{ duration: 0.25 }}
                          src={each?.attributes?.image?.data?.attributes?.url}
                          alt={
                            each.attributes.alt
                              ? each.attributes.alt
                              : "facilities"
                          }
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="w-full bg-white py-4">
                        <img
                          src={each?.attributes?.icon?.data?.attributes?.url}
                          alt="icon"
                        />
                        <div className="mt-2">
                          <p className="font-montserrat uppercase font-black text-lg">
                            {each.attributes.title}
                          </p>
                        </div>
                        <p className="font-normal text-tertiary-gray text-sm">
                          {each.attributes.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </section>
          </section>
          {/* Facilities section end */}

          {/* Feature plans section start */}
          <section className="bg-white px-4 lg:px-20 md:py-20 mt-28 md:mt-0">
            <div className="max-w-7xl md:mx-auto">
              <div className="flex flex-col md:items-center">
                <p className="font-medium px-3 py-1 text-sm bg-light-gray-sky border w-fit border-lightish-gray">
                  {facilitiesData?.futureFrame}
                </p>
                <p className="font-montserrat font-black text-4xl mt-3">
                  {facilitiesData?.futureTitle}
                </p>
                <p className="text-tertiary-gray text-xl md:text-center mt-6 max-w-3xl">
                  {facilitiesData?.futureDesc}
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-16"
              >
                {facilitiesData?.image?.data?.attributes?.url && (
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={facilitiesData?.image?.data?.attributes?.url}
                    alt="future-plan"
                    className="w-full h-full"
                  />
                )}
              </motion.div>
              <ul className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-y-0 md:gap-x-6 mt-16">
                {facilitiesData?.FuturePlanCard.map((each, index) => (
                  <motion.li
                    viewport={{ once: true }}
                    initial={{ opacity: 0, y: 200 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 * index }}
                    key={index}
                    className="bg-light-gray-sky p-6"
                  >
                    <p className="font-montserrat uppercase font-extrabold text-xl">
                      {each.planTitle}
                    </p>
                    <p className="text-tertiary-gray text-base mt-2">
                      {each.planDescription}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>
          {/* Feature plans section end */}

          <section className="px-4 lg:px-20 py-16 md:py-20 mt-20 md:mt-4 bg-light-gray-sky flex flex-col lg:items-center">
            <div className="max-w-7xl md:mx-auto">
              <div className="flex flex-col justify-center md:items-center">
                <p className="font-montserrat uppercase font-black text-4xl">
                  {facilitiesData?.journeyTitle}
                </p>
                <p className="text-tertiary-gray text-lg mt-5 lg:text-center">
                  {facilitiesData?.journeyDesc}
                </p>
              </div>
              <div className="flex flex-row md:justify-center items-center mt-8">
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="bg-black hover:bg-black/[0.8] hover:shadow-lg h-12 px-6 text-white flex justify-center items-center gap-2"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </section>
        </section>
      )}
      <DonateModal open={open} setOpen={setOpen} />
    </PrimaryLayout>
  );
};

export default Facilities;
