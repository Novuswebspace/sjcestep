/* eslint-disable multiline-ternary */
/* eslint-disable no-undef */
/* eslint-disable brace-style */

"use client";
import { MdOutlineArrowForward } from "react-icons/md";
import MilestoneCard from "@/components/about-us/journySlider";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import Loader from "../components/common/loaders/primaryLoader";
import Slider from "react-slick";
import { settingsImpact } from "../components/home/sliderSettings";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "../components/common/Meta";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../components/common/loaders/dataLoader";

const AboutUs = () => {
  // Data fetching
  const fetchAboutData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/about?populate=*`
    );
    return data.data.attributes;
  };

  const { data: aboutData, isLoading } = useQuery({
    queryKey: ["aboutData"],
    queryFn: fetchAboutData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  //Images data
  const fetchAboutComponentsData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/about?populate[managementCard][populate]=*&populate[ProfileCard][populate]=*&populate[collegeCard][populate]=*&populate[journeyCard][populate]=*`
    );
    return data.data.attributes;
  };

  const { data: imagesData } = useQuery({
    queryKey: ["aboutData-images"],
    queryFn: fetchAboutComponentsData,
    refetchOnWindowFocus: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (index) => ({
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.3 * index,
      },
    }),
  };

  return (
    <PrimaryLayout footerColor={true}>
      <Meta
        title="SJCE-STEP, or SJCE - Science & Technology Entrepreneurs Park"
        description="SJCE-STEP, or SJCE - Science & Technology Entrepreneurs Park, is a well-established business incubation center located in Mysuru, India. Founded in 1985 with support from the Indian government's Department of Science"
        keywords="Science, Technology, Entrepreneurs Park"
        ogTitle="SJCE-STEP, or SJCE - Science & Technology Entrepreneurs Park"
        ogDescription="SJCE-STEP, or SJCE - Science & Technology Entrepreneurs Park, is a well-established business incubation center located in Mysuru, India. Founded in 1985 with support from the Indian government's Department of Science"
        ogUrl="https://www.sjcestep.in/about-us"
        twitterTitle="SJCE-STEP, or SJCE - Science & Technology Entrepreneurs Park"
        twitterDescription="SJCE-STEP, or SJCE - Science & Technology Entrepreneurs Park, is a well-established business incubation center located in Mysuru, India. Founded in 1985 with support from the Indian government's Department of Science"
      />
      <Loader />
      {isLoading ? (
        <DataLoader />
      ) : (
        <div className="mt-16 md:mt-24 min-h-screen max-w-8xl mx-auto">
          {/* Section one start */}
          <section className="px-4 lg:px-20 flex flex-col md:items-center">
            <div className="flex flex-col justify-center md:items-center">
              <p className="font-medium text-sm px-3 py-1 w-fit bg-light-gray-sky border border-lightish-gray">
                {aboutData?.aboutHeadingFrame}
              </p>
              <p className="font-montserrat font-black text-4xl mt-3">
                {aboutData?.aboutTitle}
              </p>
              <p className="text-tertiary-gray text-xl mt-6 max-w-3xl lg:text-center">
                {aboutData?.description}
              </p>
            </div>
            <div className="mt-12 lg:mt-16 h-72 lg:h-auto">
              <img
                src={aboutData?.aboutImage?.data?.attributes?.url}
                alt="sjce-image"
                className="object-cover w-full h-full"
              />
            </div>
          </section>
          {/* Section one end */}

          {/* Section two start */}
          <section className="px-4 lg:px-20 py-10 md:py-20 bg-light-gray-sky mt-32">
            <div className="flex flex-col justify-center lg:items-center">
              <p className="font-medium text-sm px-3 py-1 w-fit bg-light-gray-sky border border-lightish-gray">
                {aboutData?.managementFrame}
              </p>
              <p className="font-montserrat font-black text-4xl mt-3">
                {aboutData?.managementTitle}
              </p>  
            </div>

            {/* Pyramid structure for Management */}
            <div className="hidden lg:flex flex-col items-center mt-16">
              {/* Top: Swamiji */}
              {imagesData?.managementCard?.[0] && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0}
                  className="flex flex-col items-center"
                >
                  <img
                    src={
                      imagesData.managementCard[0]?.image?.data?.attributes?.url
                    }
                    alt={imagesData.managementCard[0]?.name}
                    className="object-cover h-72 w-72 mx-auto rounded-xl"
                  />
                  <div className="mt-6 text-center">
                    <p className="font-montserrat uppercase font-extrabold text-xl">
                      {imagesData.managementCard[0]?.name}
                    </p>
                    <p className="text-medium-pink text-lg">
                      {imagesData.managementCard[0]?.post}
                    </p>
                    <p className="text-tertiary-gray text-base mt-4">
                      {imagesData.managementCard[0]?.designation}
                    </p>
                  </div>
                </motion.div>
              )}
              {/* Row below: 2 members */}
              <div className="flex flex-row justify-center gap-32 mt-12">
                {[1, 2].map(
                  (i) =>
                    imagesData?.managementCard?.[i] && (
                      <motion.div
                        key={i}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={i}
                        className="flex flex-col items-center"
                      >
                        <img
                          src={
                            imagesData.managementCard[i]?.image?.data
                              ?.attributes?.url
                          }
                          alt={imagesData.managementCard[i]?.name}
                          className="object-cover h-72 w-72 mx-auto rounded-xl"
                        />
                        <div className="mt-6 text-center">
                          <p className="font-montserrat uppercase font-extrabold text-xl">
                            {imagesData.managementCard[i]?.name}
                          </p>
                          <p className="text-medium-pink text-lg">
                            {imagesData.managementCard[i]?.post}
                          </p>
                          <p className="text-tertiary-gray text-base mt-4">
                            {imagesData.managementCard[i]?.designation}
                          </p>
                        </div>
                      </motion.div>
                    )
                )}
              </div>
            </div>
           
            <ul className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mt-10 lg:mt-16">
              {imagesData?.managementCard?.slice(3).map((each, index) => (
                <motion.li
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  key={index}
                >
                  {each?.linkedin ? (
                    <Link target="_blank" href={each?.linkedin}>
                      <img
                        src={each?.image?.data?.attributes?.url}
                        alt={each.name}
                        className="object-cover h-72 w-72 rounded-xl m-auto"
                      />
                      <div className="mt-6 w-80 m-auto">
                        <p className="font-montserrat uppercase font-extrabold text-xl">
                          {each.name}
                        </p>
                        <p className="text-medium-pink text-lg">{each.post}</p>
                        <p className="text-tertiary-gray text-base mt-4">
                          {each.designation}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <>
                      <img
                        src={each?.image?.data?.attributes?.url}
                        alt={each.name}
                        className="object-cover h-72 w-72 rounded-xl m-auto"
                      />
                      <div className="mt-6 w-80" >
                        <p className="font-montserrat uppercase font-extrabold text-xl">
                          {each.name}
                        </p>
                        <p className="text-medium-pink text-lg">{each.post}</p>
                        <p className="text-tertiary-gray text-base mt-4">
                          {each.designation}
                        </p>
                      </div>
                    </>
                  )}
                </motion.li>
              ))}
            </ul>
            <ul className="lg:hidden meet-our-team">
              <Slider {...settingsImpact}>
                {imagesData?.managementCard?.map((each, index) =>
                  each?.linkedin ? (
                    <Link
                      target="_blank"
                      href={each?.linkedin}
                      key={index}
                      className="mt-8"
                    >
                      <img
                        src={each?.image?.data?.attributes?.url}
                        alt={each.name}
                        className="object-cover h-72 w-full"
                      />
                      <div className="mt-6 text-center">
                        <p className="font-montserrat uppercase font-extrabold text-xl">
                          {each.name}
                        </p>
                        <p className="text-medium-pink text-lg">{each.post}</p>
                        <p className="text-tertiary-gray text-base mt-4">
                          {each.designation}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <li key={index} className="mt-8">
                      <img
                        src={each?.image?.data?.attributes?.url}
                        alt={each.name}
                        className="object-cover h-72 w-full"
                      />
                      <div className="mt-6 text-center">
                        <p className="font-montserrat uppercase font-extrabold text-xl">
                          {each.name}
                        </p>
                        <p className="text-medium-pink text-lg">{each.post}</p>
                        <p className="text-tertiary-gray text-base mt-4">
                          {each.designation}
                        </p>
                      </div>
                    </li>
                  )
                )}
              </Slider>
            </ul>
          </section>
          {/* Section two end */}

          {/* Section four start */}
          <section className="px-4 lg:px-20 py-10 md:py-20 mt-16 bg-white flex flex-col lg:items-center">
            <div className="flex flex-col justify-center items-start lg:items-center">
              <p className="font-medium text-sm px-3 py-1 bg-light-gray-sky border border-lightish-gray">
                {aboutData?.advisoryFrame}
              </p>
              <p className="font-montserrat font-black text-4xl mt-3 break-words">
                {aboutData?.advisoryTitle}
              </p>
              <p className="text-tertiary-gray text-lg mt-6 max-w-2xl lg:text-center">
                {aboutData?.advisoryDescription}
              </p>
            </div>
            {/* first 5 advisors */}
            <ul className="mt-76px lg:flex justify-center gap-[80px]">
              {imagesData?.ProfileCard?.slice(0, 5).map((each, index) => (
                <motion.li
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  key={index}
                  className="hidden lg:flex flex-col items-center text-center"
                >
                  <div className="h-80 w-52 flex flex-col p-2 gap-3 rounded-xl bg-neutral-100">
                    {each?.linkedin ? (
                      <Link
                        href={each?.linkedin}
                        target="_blank"
                        className="h-max"
                      >
                        <div className="h-50 w-50 flex items-center justify-center">
                          <img
                            src={each?.image?.data?.attributes?.url}
                            className="w-full h-full rounded-xl"
                            alt={each?.name}
                          />
                        </div>
                      </Link>
                    ) : (
                      <div className="h-24">
                        <img
                          src={each?.image?.data?.attributes?.url}
                          className="w-full h-full rounded-xl"
                          alt={each?.name}
                        />
                      </div>
                    )}
                    <div className="flex flex-col items-start justify-center px-2">
                      <p className="font-semibold text-base mt-2">
                        {each.name}
                      </p>
                      <p className=" text-black text-sm mt-2">Designation</p>
                      <p className=" text-gray-500 text-sm mt-2">ABC company</p>
                      <p className="text-medium-pink text-sm">{each.title}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
              {/* mobile view */}
              <div className="lg:hidden">
                <Slider {...settingsImpact}>
                  {imagesData?.ProfileCard?.map((each, index) =>
                    each?.linkedin ? (
                      <div
                        key={index}
                        className="h-50 w-50 flex items-center justify-center mb-1 bg-neutral-200 p-3 rounded-xl"
                      >
                        <Link
                          key={index}
                          target="_blank"
                          className="!flex flex-col justify-center items-center text-center"
                          href={each?.linkedin}
                        >
                          <img
                            className="object-cover w-full h-full rounded-xl"
                            src={each?.image?.data?.attributes?.url}
                            alt="advisor profile-image"
                          />
                          <div className="flex flex-col items-center justify-center px-2">
                            <p className="font-semibold text-base mt-5">
                              {each.name}
                            </p>
                            <p className=" text-black text-md mt-2">
                              Designation
                            </p>
                            <p className=" text-gray-500 text-sm mt-2">
                              ABC company
                            </p>
                            <p className="text-medium-pink text-sm">
                              {each.title}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <li
                        key={index}
                        className="!flex flex-col justify-center items-center text-center"
                      >
                        <div className="h-max w-max flex items-center justify-center mb-1">
                          <img
                            className="object-cover w-full h-full"
                            src={each?.image?.data?.attributes?.url}
                            alt="advisor profile-image"
                          />
                          <p className="font-semibold text-base mt-5">
                            {each.name}
                          </p>
                          <p className="text-medium-pink text-sm">
                            {each.title}
                          </p>
                        </div>
                      </li>
                    )
                  )}
                </Slider>
              </div>
            </ul>
            {/* next 4 advisors */}
            <ul className="mt-14 hidden lg:flex justify-center gap-36">
              {imagesData?.ProfileCard?.slice(5).map((each, index) => (
                <motion.li
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  key={index}
                  className="flex flex-col items-center"
                >
                   <div className="h-80 w-52 flex flex-col p-2 gap-3 rounded-xl bg-neutral-100">
                    {each?.linkedin ? (
                      <Link
                        href={each?.linkedin}
                        target="_blank"
                        className="h-max"
                      >
                        <div className="h-50 w-50 flex items-center justify-center">
                          <img
                            src={each?.image?.data?.attributes?.url}
                            className="w-full h-full rounded-xl"
                            alt={each?.name}
                          />
                        </div>
                      </Link>
                    ) : (
                      <div className="h-24">
                        <img
                          src={each?.image?.data?.attributes?.url}
                          className="w-full h-full rounded-xl"
                          alt={each?.name}
                        />
                      </div>
                    )}
                    <div className="flex flex-col items-start justify-center px-2">
                      <p className="font-semibold text-base mt-2">
                        {each.name}
                      </p>
                      <p className=" text-black text-sm mt-2">Designation</p>
                      <p className=" text-gray-500 text-sm mt-2">ABC company</p>
                      <p className="text-medium-pink text-sm">{each.title}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </section>
          {/* Section four end */}

          <section className="mx-auto mt-20 md:mt-10 bg-light-gray-sky relative md:py-20 py-10 px-4 lg:px-20">
            <div className="flex flex-col justify-center items-start lg:items-center">
              <p className="font-medium text-sm px-3 py-1 bg-light-gray-sky border border-lightish-gray">
                {aboutData?.journeyFrame}
              </p>
              <p className="font-montserrat font-black text-4xl mt-3 break-words">
                {aboutData?.journeyTitle}
              </p>
              <p className="text-tertiary-gray text-lg mt-6 max-w-2xl lg:text-center">
                {aboutData?.journeyDesc}
              </p>
            </div>
            {imagesData && (
              <MilestoneCard sliderContent={imagesData?.journeyCard} />
            )}
            <div className="hidden md:block h-[12%] w-[10%] absolute bottom-[0%] left-[5%] md:bottom-[3%] md:left-[2%] lg:bottom-[0%] lg:left-[8%] bg-light-gray-sky 2xl:left-[12%] 2xl:bottom-[-1%]"></div>
          </section>

          {/* Section four start */}
          <section className="px-4 lg:px-20 py-20 mt-4 flex flex-col lg:items-center">
            <div className="flex flex-col justify-center lg:items-center">
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="font-medium text-sm w-fit px-3 py-1 bg-light-gray-sky border border-lightish-gray"
              >
                {aboutData?.collegeCard?.collegeFrame}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="font-montserrat uppercase font-black text-4xl mt-3 break-words"
              >
                {aboutData?.collegeCard?.collegeTitle}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-tertiary-gray text-lg mt-6 max-w-2xl lg:text-center"
              >
                {aboutData?.collegeCard?.collegeDesc}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-16 h-72 lg:h-auto"
            >
              <img
                src={imagesData?.collegeCard?.image?.data?.attributes?.url}
                alt="jss-mahavidyapeetha image"
                className="object-cover h-full"
              />
            </motion.div>
            <div className="flex justify-center items-center mt-16">
              <Link
                href="https://jssonline.org/"
                type="button"
                target="_blank"
                className="bg-orange-dull grow md:grow-0 duration-300  hover:bg-dark-gray h-12 px-6 text-white flex justify-center items-center gap-2"
              >
                Know more <MdOutlineArrowForward />
              </Link>
            </div>
          </section>
          {/* Section four end */}

          {/* Section five start */}
          <section className="px-4 lg:px-20 py-16 md:py-20 mt-16 bg-light-gray-sky flex flex-col lg:items-center">
            <div className="flex flex-col justify-center lg:items-center">
              <p className="font-montserrat uppercase font-black text-4xl">
                Contact Us
              </p>
              <p className="text-tertiary-gray text-lg mt-6 lg:text-center">
                Get in touch with us to learn more about our programs,
                facilities, and opportunities. We&apos;re here to help you
                succeed.
              </p>
            </div>
            <div className="flex justify-center items-center mt-7 md:mt-14">
              <Link
                href="/contact"
                type="button"
                className="bg-black w-full md:w-auto hover:bg-black/[0.8] hover:shadow-lg h-12 px-6 text-white flex justify-center items-center gap-2"
              >
                Contact Us <MdOutlineArrowForward />
              </Link>
            </div>
          </section>
          {/* Section five end */}
        </div>
      )}
    </PrimaryLayout>
  );
};

export default AboutUs;
