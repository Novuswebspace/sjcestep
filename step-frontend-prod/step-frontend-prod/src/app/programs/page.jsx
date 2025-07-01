/* eslint-disable multiline-ternary */
/* eslint-disable no-undef*/
/* eslint-disable brace-style*/
/* eslint-disable object-curly-newline*/

"use client";
import React from "react";
import ProgramCard from "@/components/programs/programCard";
import BannerCard from "@/components/common/bannerCard";
import Link from "next/link";
import PrimaryLayout from "../components/layouts/primaryLayout";
import axios from "axios";
import Loader from "../components/common/loaders/primaryLoader";
import { motion } from "framer-motion";
import Meta from "../components/common/Meta";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../components/common/loaders/dataLoader";

const Page = () => {
  //Programs header
  const fetchProgramHeaderData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/program-header?populate[sisfBeneficiariesImage][populate]=*&populate[acceleropreneurImages][populate]=*&populate=*`
    );
    return data.data.attributes;
  };

  const { data: programHeader, isLoading } = useQuery({
    queryKey: ["programHeaderData"],
    queryFn: fetchProgramHeaderData,
    refetchOnWindowFocus: false,
  });

  //Programs data
  const fetchProgramsData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/programs?populate=*`
    );
    return data.data;
  };

  const { data: programs } = useQuery({
    queryKey: ["All-programsData"],
    queryFn: fetchProgramsData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  const listItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * index,
      },
    }),
  };

  return (
    <PrimaryLayout>
      <Loader />
      <Meta
        title="SJCE STEP: Incubation Opportunities and Innovative Programs"
        description="SJCE-STEP's 4-month accelerator program for promising startups. Gain a 360-degree improvement through leadership camps, mentor connections"
        keywords="leadership camps, mentor connections"
        ogTitle="SJCE STEP: Incubation Opportunities and Innovative Programs"
        ogDescription="SJCE-STEP's 4-month accelerator program for promising startups. Gain a 360-degree improvement through leadership camps, mentor connections"
        ogUrl="https://www.sjcestep.in/programs"
        twitterTitle="SJCE STEP: Incubation Opportunities and Incubation Opportunities"
        twitterDescription="SJCE-STEP's 4-month accelerator program for promising startups. Gain a 360-degree improvement through leadership camps, mentor connections"
      />
      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="px-4 lg:px-0">
          <section className="grid place-items-start md:place-items-center pt-16 md:pt-24 pb-10 md:pb-14">
            <BannerCard
              textPosition="md:text-center"
              item={programHeader && programHeader}
            />
          </section>

          <section className="md:px-20">
            <div className="grid max-w-7xl md:mx-auto lg:grid-cols-2 gap-x-7 gap-y-16">
              {programs?.map((item) => (
                <Link href={`/programs/${item.attributes.slug}`} key={item.id}>
                  <ProgramCard imageHeight="md:h-[230px]" item={item} />
                </Link>
              ))}
            </div>
          </section>

          {/* Benificiaries section start */}
          <section className="bg-light-gray-sky px-4 md:px-20 py-10 md:py-20 mt-28">
            <div className="flex flex-col items-center">
              <p className="font-medium px-3 py-1 text-sm bg-light-gray-sky border w-fit border-lightish-gray">
                {programHeader?.sisfFrame}
              </p>
              <p className="font-montserrat uppercase font-black text-3xl sm:text-4xl mt-3 max-w-xl text-center">
                {programHeader?.beneficiariesTitle}
              </p>
              <p className="text-tertiary-gray text-xl text-center mt-6 max-w-xl">
                {programHeader?.beneficiariesDesc}
              </p>
            </div>
            <ul className="flex justify-center flex-wrap gap-8 mt-16 max-w-4xl mx-auto">
              {programHeader?.sisfBeneficiariesImage?.map((each, index) => (
                <motion.li
                  variants={listItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  custom={index}
                  viewport={{ once: true }}
                  className="bg-white h-16 p-1 border border-secondary-gray rounded-2xl flex justify-center items-center"
                  key={index}
                >
                  {each?.link ? (
                    <Link
                      href={each?.link}
                      target="_blank"
                      className=" h-16 object-cover"
                    >
                      <img
                        src={each?.image?.data?.attributes?.url}
                        alt={each?.alt ? each.alt : "company-logo"}
                        className="h-full"
                      />
                    </Link>
                  ) : (
                    <img
                      src={each?.image?.data?.attributes?.url}
                      alt={each?.alt ? each.alt : "company-logo"}
                      className="object-cover h-full"
                    />
                  )}
                </motion.li>
              ))}
            </ul>
          </section>
          {/* Benificiaries section end */}

          {/* Acceleropreneur section start */}
          <section className="bg-white px-4 md:px-20 py-16 md:py-20">
            <div className="flex flex-col items-center">
              <p className="font-medium text-sm px-3 py-1 bg-light-gray-sky border w-fit border-lightish-gray">
                {programHeader?.Acceleropreneur}
              </p>
              <p className="font-montserrat font-black text-3xl md:text-4xl mt-3 uppercase max-w-xl text-center">
                {programHeader?.acceleropreneurTitle}
              </p>
              <p className="text-tertiary-gray text-center text-xl mt-6 max-w-xl">
                {programHeader?.acceleropreneurDesc}
              </p>
            </div>
            <ul className="flex justify-center flex-wrap gap-8 mt-16 max-w-4xl mx-auto">
              {programHeader?.acceleropreneurImages?.map((each, index) => (
                <motion.li
                  variants={listItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className="bg-white h-16 p-1 border border-secondary-gray rounded-2xl flex justify-center items-center"
                  key={index}
                >
                  {each?.link ? (
                    <Link
                      href={each?.link}
                      target="_blank"
                      className="inline-block h-16"
                    >
                      <img
                        src={each?.image?.data?.attributes?.url}
                        alt={each?.alt ? each.alt : "company-logo"}
                        className="h-full object-cover"
                      />
                    </Link>
                  ) : (
                    <img
                      src={each?.image?.data?.attributes?.url}
                      alt={each?.alt ? each.alt : "company-logo"}
                      className="object-cover h-full"
                    />
                  )}
                </motion.li>
              ))}
            </ul>
          </section>
          {/* Acceleropreneur section end */}
        </section>
      )}
    </PrimaryLayout>
  );
};

export default Page;
