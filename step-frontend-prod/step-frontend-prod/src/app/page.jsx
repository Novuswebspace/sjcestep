/* eslint-disable brace-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
/* eslint-disable object-curly-newline */

"use client";
import { useEffect, useState } from "react";
import { settingsImpact } from "@/components/home/sliderSettings";
import BlogCard from "@/app/components/newsBlogs/blogCard";
import ImpactCard from "@/components/home/impactCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdOutlineArrowForward } from "react-icons/md";
import { HoverBorderGradient } from "./components/common/buttonGradient/buttonGradient";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import Loader from "./components/common/loaders/primaryLoader";
import axios from "axios";
import HeaderText from "@/components/common/headerText";
import ProgramCard from "./components/programs/programCard";
import Markdown from "react-markdown";
import Meta from "./components/common/Meta";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "./components/common/loaders/dataLoader";
import CountUpItem from "./components/home/CountUpItem";
import PopupModal from "./components/common/PopupModal";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Featured Programs Data
  const featuredPrograms = [
    {
      id: 1,
      badge: "FOR WOMEN",
      badgeColor: "bg-purple-600",
      title: "MSME Idea Hackathon 3.0",
      description:
        "A business accelerator program for promoting startups. Startups/MSMEs get mentorship, funding, market assistance and advisors including skill aspects of business.",
      imageText: "MSME Hackathon",
      imageColor: "bg-purple-600",
      link: "/programs/msme-hackathon",
    },
    {
      id: 2,
      badge: "TECH FOCUS",
      badgeColor: "bg-blue-600",
      title: "AI/ML Innovation Lab",
      description:
        "Advanced artificial intelligence and machine learning program for tech enthusiasts. Participants get hands-on experience with cutting-edge AI technologies and real-world projects.",
      imageText: "AI/ML Lab",
      imageColor: "bg-blue-600",
      link: "/programs/ai-ml-lab",
    },
    {
      id: 3,
      badge: "STARTUP",
      badgeColor: "bg-green-600",
      title: "Startup Accelerator Program",
      description:
        "Comprehensive startup development program offering mentorship, funding opportunities, market access, and networking with industry experts and investors.",
      imageText: "Accelerator",
      imageColor: "bg-green-600",
      link: "/programs/startup-accelerator",
    },
    {
      id: 4,
      badge: "INNOVATION",
      badgeColor: "bg-orange-600",
      title: "Digital Innovation Hub",
      description:
        "A collaborative space for digital innovation and technology development. Focus on emerging technologies like IoT, Blockchain, and Cloud Computing.",
      imageText: "Digital Hub",
      imageColor: "bg-orange-600",
      link: "/programs/digital-innovation",
    },
    {
      id: 5,
      badge: "RESEARCH",
      badgeColor: "bg-indigo-600",
      title: "Research & Development Center",
      description:
        "State-of-the-art R&D facility supporting research projects, patent development, and commercialization of innovative technologies.",
      imageText: "R&D Center",
      imageColor: "bg-indigo-600",
      link: "/programs/research-development",
    },
  ];

  // Upcoming Programs Data
  const upcomingPrograms = [
    {
      id: 1,
      title: "Tech Innovation Challenge",
      description:
        "A competitive platform for tech innovators to showcase their solutions",
      date: "Dec 15, 2024",
      link: "/programs/tech-innovation-challenge",
    },
    {
      id: 2,
      title: "Women Entrepreneur Workshop",
      description:
        "Empowering women entrepreneurs with skills and networking opportunities",
      date: "Dec 20, 2024",
      link: "/programs/women-entrepreneur-workshop",
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description:
        "Platform for startups to pitch their ideas to investors and mentors",
      date: "Jan 10, 2025",
      link: "/programs/startup-pitch-competition",
    },
    {
      id: 4,
      title: "AI/ML Bootcamp",
      description:
        "Intensive training program on artificial intelligence and machine learning",
      date: "Jan 15, 2025",
      link: "/programs/ai-ml-bootcamp",
    },
    {
      id: 5,
      title: "Digital Marketing Masterclass",
      description: "Learn digital marketing strategies for business growth",
      date: "Jan 25, 2025",
      link: "/programs/digital-marketing-masterclass",
    },
    {
      id: 6,
      title: "Blockchain Development Workshop",
      description:
        "Hands-on workshop on blockchain technology and applications",
      date: "Feb 5, 2025",
      link: "/programs/blockchain-workshop",
    },
  ];

  // Our Incubatees Data
  const incubatees = [
    {
      id: 1,
      name: "InnovateLab",
      industry: "Technology",
      description: "AI-powered solutions for business automation",
      logo: "/images/incubatees/innovatelab.png",
      link: "/incubatees/innovatelab",
    },
    {
      id: 2,
      name: "Meracal",
      industry: "Healthcare",
      description: "Digital health monitoring and telemedicine platform",
      logo: "/images/incubatees/meracal.png",
      link: "/incubatees/meracal",
    },
    {
      id: 3,
      name: "Lama",
      industry: "E-commerce",
      description: "Sustainable fashion marketplace",
      logo: "/images/incubatees/lama.png",
      link: "/incubatees/lama",
    },
    {
      id: 4,
      name: "Agropak",
      industry: "Agriculture",
      description: "Smart farming solutions and crop management",
      logo: "/images/incubatees/agropak.png",
      link: "/incubatees/agropak",
    },
    {
      id: 5,
      name: "Everest",
      industry: "Education",
      description: "Online learning platform for skill development",
      logo: "/images/incubatees/everest.png",
      link: "/incubatees/everest",
    },
    {
      id: 6,
      name: "TechCorp",
      industry: "Fintech",
      description: "Digital payment and financial services",
      logo: "/images/incubatees/techcorp.png",
      link: "/incubatees/techcorp",
    },
    {
      id: 7,
      name: "Innov",
      industry: "Clean Energy",
      description: "Renewable energy solutions and sustainability",
      logo: "/images/incubatees/innov.png",
      link: "/incubatees/innov",
    },
    {
      id: 8,
      name: "DataFlow",
      industry: "Data Analytics",
      description: "Big data analytics and business intelligence",
      logo: "/images/incubatees/dataflow.png",
      link: "/incubatees/dataflow",
    },
  ];

  const resetPopup = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("hasSeenProgramPopup");
      setShowPopup(true);
    }
  };

  // Data fetching for all data in home page
  const fetchHomeData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/home?populate=*`
    );
    return data.data.attributes;
  };

  const { data: homeData, isLoading } = useQuery({
    queryKey: ["homeData"],
    queryFn: fetchHomeData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % homeData?.marquee.length
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [homeData?.marquee]);

  //Images data fetching nested data
  const fetchImagesData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/home?populate[achievements][populate]=*&populate[testimonialCard][populate]=*&populate[companyLogos][populate]=*&populate[ecosystemPartnerImages][populate]=*&populate[beneficiariesImage][populate]=*`
    );
    return data.data.attributes;
  };

  const { data: imagesData } = useQuery({
    queryKey: ["imagesData"],
    queryFn: fetchImagesData,
    refetchOnWindowFocus: false,
  });

  //News blogs
  const fetchNewsData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/news?pagination[page]=1&pagination[pageSize]=2&populate=*`
    );
    return data.data;
  };

  const { data: newsData } = useQuery({
    queryKey: ["blogData", 1],
    queryFn: fetchNewsData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  //Program section beneficiaries images
  const fetchProgramHeaderData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/program-header?populate[sisfBeneficiariesImage][populate]=*`
    );
    return data.data.attributes;
  };

  const { data: programHeader } = useQuery({
    queryKey: ["programHeaderData-home"],
    queryFn: fetchProgramHeaderData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  //Programs data
  const fetchProgramsData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/programs?pagination[page]=1&pagination[pageSize]=2&populate=*`
    );
    return data.data;
  };

  const { data: programs } = useQuery({
    queryKey: ["programsData-home", 1],
    queryFn: fetchProgramsData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  //Upcoming events for popup
  const fetchUpcomingEvents = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/upcoming-events?pagination[page]=1&pagination[pageSize]=3&populate=*`
    );
    return data.data;
  };

  const { data: upcomingEvents } = useQuery({
    queryKey: ["upcomingEvents-popup"],
    queryFn: fetchUpcomingEvents,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  // Popup logic for upcoming events
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenPopup = localStorage.getItem("hasSeenProgramPopup");
      if (!hasSeenPopup && upcomingEvents && upcomingEvents.length > 0) {
        setShowPopup(true);
        localStorage.setItem("hasSeenProgramPopup", "true");
      }
    }
  }, [upcomingEvents]);

  // Facilities data
  const fetchFacilitiesData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/facilities?pagination[page]=1&pagination[pageSize]=3&populate=*`
    );
    return data.data;
  };

  const { data: facilitiesImage } = useQuery({
    queryKey: ["facilitiesData-home", 1],
    queryFn: fetchFacilitiesData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (index) => ({
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2 * index,
      },
    }),
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
      },
    }),
  };

  return (
    <>
      <PopupModal isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Upcoming Events
          </h2>
          {upcomingEvents && upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-secondary-gray rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1 text-sm text-tertiary-gray">
                      <img
                        src="/images/events/calendar.svg"
                        alt="calendar"
                        className="w-4 h-4"
                      />
                      <span>{event.attributes?.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-tertiary-gray">
                      <img
                        src="/images/events/location.svg"
                        alt="location"
                        className="w-4 h-4"
                      />
                      <span>{event.attributes?.place}</span>
                    </div>
                  </div>
                  <h3 className="font-montserrat font-black text-lg mb-2">
                    {event.attributes?.title}
                  </h3>
                  <p className="text-sm text-tertiary-gray line-clamp-2">
                    {event.attributes?.desc}
                  </p>
                </div>
              ))}
              <div className="text-center mt-6">
                <Link
                  href="/events"
                  className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-black/[0.8] transition-colors w-full"
                  onClick={() => setShowPopup(false)}
                >
                  View All Events
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-tertiary-gray mb-4">
                No upcoming events at the moment. Check back soon!
              </p>
              <Link
                href="/events"
                className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-black/[0.8] transition-colors"
                onClick={() => setShowPopup(false)}
              >
                View Events
              </Link>
            </div>
          )}
          <button
            className="mt-4 w-full px-4 py-2 bg-secondary-gray text-black rounded hover:bg-gray-300 transition-colors"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
      </PopupModal>
      <PrimaryLayout>
        <Loader />

        <Meta
          title="SJCE-STEP - Science and Technology Entrepreneurs Park"
          description="SJCE-STEP is a premier innovation and entrepreneurship hub at Sri Jayachamarajendra College of Engineering. We support startups, innovators, and entrepreneurs through incubation programs, mentorship, and state-of-the-art facilities."
          keywords="SJCE-STEP, Innovation, Entrepreneurship, Incubation, Startups, Technology Park, NIDHI Prayas, SISFS, Acceleropreneur"
          ogTitle="SJCE-STEP - Science and Technology Entrepreneurs Park"
          ogDescription="SJCE-STEP is a premier innovation and entrepreneurship hub at Sri Jayachamarajendra College of Engineering. We support startups, innovators, and entrepreneurs through incubation programs, mentorship, and state-of-the-art facilities."
          ogUrl="https://www.sjcestep.in/"
          twitterTitle="SJCE-STEP - Science and Technology Entrepreneurs Park"
          twitterDescription="SJCE-STEP is a premier innovation and entrepreneurship hub at Sri Jayachamarajendra College of Engineering. We support startups, innovators, and entrepreneurs through incubation programs, mentorship, and state-of-the-art facilities."
        />
        {isLoading ? (
          <DataLoader />
        ) : (
          <div className="mt-16 md:mt-24 min-h-screen max-w-8xl mx-auto">
            {/* Hero Banner Section start*/}
            <section className="flex flex-col md:items-center bg-[url('/images/home/banner-pattern.png')] bg-cover px-4 lg:px-0">
              <Link
                href="/about-us"
                className="font-montserrat button-navigation flex items-center gap-3 border border-light-gray px-1 pr-3 py-1 font-medium text-sm"
              >
                <div className="border border-light-gray text-extra-light-dark flex items-center gap-1 px-1 py-2px">
                  <div className="h-4 w-4 rounded-full bg-sand-gray who-are-you border-4 border-extra-light-pink"></div>
                  {homeData?.headChip}
                </div>
                <div className="flex items-center gap-2">
                  {homeData?.quickIntro} <MdOutlineArrowForward />
                </div>
              </Link>
              <div className="md:text-center mt-8">
                <h1 className="font-montserrat uppercase font-black text-4xl md:text-6xl">
                  {homeData?.homeHeading}
                </h1>
                {homeData?.marquee?.map((word, index) => (
                  <p
                    key={index}
                    className={`font-montserrat uppercase font-black text-gradient text-4xl md:text-6xl mt-2 md:mt-4 animatedWord ${
                      index === currentIndex ? "animate" : "hidden"
                    }`}
                  >
                    {word?.title}
                  </p>
                ))}
                <motion.div
                  initial={{ opacity: 0, translateY: 150 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 3 }}
                  className="text-tertiary-gray font-normal text-lg mt-6 max-w-2xl"
                >
                  <Markdown>{homeData?.description}</Markdown>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, translateY: 200 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 3 }}
                className="w-full md:w-auto flex flex-col md:flex-row justify-center items-center gap-3 mt-8"
              >
                <HoverBorderGradient
                  containerClassName="rounded-none"
                  as="div"
                  className="dark:bg-black w-full md:w-auto bg-white text-black dark:text-white flex justify-center items-center"
                >
                  <Link
                    href="/contact"
                    className="flex justify-center items-center order-2 md:order-none font-semibold bg-white hover:bg-light-gray-sky text-extra-light-dark text-lg h-14 w-full md:w-auto px-6"
                  >
                    Incubate With Us
                  </Link>
                </HoverBorderGradient>
                <Link
                  href="/contact"
                  type="button"
                  className="order-1 md:order-none flex justify-center items-center font-semibold hover:bg-black/[0.8] hover:shadow-lg bg-black text-white text-lg h-14 w-full md:w-auto px-6"
                >
                  Book a visit
                </Link>
              </motion.div>
              <div className="mx-auto mt-16 w-full md:px-20 bg-white">
                {/* Featured Programs Section */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-center mb-8 text-white">
                    Featured Programs
                  </h2>

                  {/* Featured Programs Slider */}
                  <div className="relative">
                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                          transform: `translateX(-${sliderIndex * 100}%)`,
                        }}
                      >
                        {featuredPrograms.map((program) => (
                          <div
                            key={program.id}
                            className="w-full flex-shrink-0"
                          >
                            <div className="bg-gray-100 rounded-lg p-8 flex flex-col lg:flex-row gap-8">
                              <div className="flex-1">
                                <div
                                  className={`inline-block ${program.badgeColor} text-white px-4 py-1 rounded-full text-sm mb-4`}
                                >
                                  {program.badge}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-700 mb-4">
                                  {program.title}
                                </h3>
                                <p className="text-gray-700 mb-6">
                                  {program.description}
                                </p>
                                <Link href={program.link}>
                                  <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded hover:opacity-90 transition-opacity">
                                    Learn More
                                  </button>
                                </Link>
                              </div>
                              <div className="flex-1">
                                <div
                                  className={`${program.imageColor} rounded-lg h-48 flex items-center justify-center`}
                                >
                                  <span className="text-white text-xl font-semibold">
                                    {program.imageText}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-center items-center gap-4 mt-6">
                      <button
                        onClick={() =>
                          setSliderIndex((prev) =>
                            prev === 0 ? featuredPrograms.length - 1 : prev - 1
                          )
                        }
                        className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <div className="flex gap-2">
                        {featuredPrograms.map((_, index) => (
                          <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${sliderIndex === index ? "bg-blue-500" : "bg-gray-600 border border-gray-500"}`}
                          ></div>
                        ))}
                      </div>
                      <button
                        onClick={() =>
                          setSliderIndex((prev) =>
                            prev === featuredPrograms.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upcoming Programs Section */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-center mb-8 text-slate-700">
                    Upcoming Programs
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {upcomingPrograms.map((program) => (
                      <Link key={program.id} href={program.link}>
                        <div className="bg-gray-100 border-2 border-slate-300 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors cursor-pointer">
                          <h3 className="text-slate-800 font-semibold">
                            {program.title}
                          </h3>
                          <p className="text-tertiary-gray text-sm mt-2">
                            {program.date}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Our Incubatees Section */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
                    Our Incubatees
                  </h2>

                  {/* First Row - Slides Left to Right */}
                  <div className="overflow-hidden mb-4">
                    <div className="flex animate-marquee-left">
                      {incubatees.slice(0, 4).map((incubatee) => (
                        <div
                          key={incubatee.id}
                          className="flex-shrink-0 w-1/4 px-2"
                        >
                          <Link href={incubatee.link}>
                            <div className="bg-gray-100 border-2 border-slate-300 rounded-full p-4 text-center hover:bg-gray-200 transition-colors cursor-pointer">
                              <h3 className="text-slate-800 font-semibold text-sm">
                                {incubatee.name}
                              </h3>
                            </div>
                          </Link>
                        </div>
                      ))}
                      {/* Duplicate for seamless loop */}
                      {incubatees.slice(0, 4).map((incubatee) => (
                        <div
                          key={`${incubatee.id}-duplicate`}
                          className="flex-shrink-0 w-1/4 px-2"
                        >
                          <Link href={incubatee.link}>
                            <div className="bg-gray-100 border-2 border-slate-300 rounded-full p-4 text-center hover:bg-gray-200 transition-colors cursor-pointer">
                              <h3 className="text-slate-800 font-semibold text-sm">
                                {incubatee.name}
                              </h3>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Second Row - Slides Right to Left */}
                  <div className="overflow-hidden">
                    <div className="flex animate-marquee-right">
                      {incubatees.slice(4, 8).map((incubatee) => (
                        <div
                          key={incubatee.id}
                          className="flex-shrink-0 w-1/4 px-2"
                        >
                          <Link href={incubatee.link}>
                            <div className="bg-gray-100 border-2 border-slate-300 rounded-full p-4 text-center hover:bg-gray-200 transition-colors cursor-pointer">
                              <h3 className="text-slate-800 font-semibold text-sm">
                                {incubatee.name}
                              </h3>
                            </div>
                          </Link>
                        </div>
                      ))}
                      {/* Duplicate for seamless loop */}
                      {incubatees.slice(4, 8).map((incubatee) => (
                        <div
                          key={`${incubatee.id}-duplicate`}
                          className="flex-shrink-0 w-1/4 px-2"
                        >
                          <Link href={incubatee.link}>
                            <div className="bg-gray-100 border-2 border-slate-300 rounded-full p-4 text-center hover:bg-gray-200 transition-colors cursor-pointer">
                              <h3 className="text-slate-800 font-semibold text-sm">
                                {incubatee.name}
                              </h3>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Hero Banner Section end*/}

            {/* Achivements old cards */}
            <ul className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
              {imagesData?.achievements?.map((eachImapact, index) => (
                <motion.div
                  key={index}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 200 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 * index }}
                >
                  <ImpactCard eachImapact={eachImapact} />
                </motion.div>
              ))}
            </ul>
            <ul className="block md:hidden mt-10">
              <Slider {...settingsImpact}>
                {imagesData?.achievements?.map((eachImapact, index) => (
                  <ImpactCard
                    eachImapact={eachImapact}
                    key={index}
                    classname="min-h-270px"
                  />
                ))}
              </Slider>
            </ul>

            {/* Achievements Section start*/}
            <section className="md:flex flex-col items-center mt-16 md:mt-32 px-4 md:px-20">
              <HeaderText title={homeData?.achievementHeading?.heading} />
              <p className="font-montserrat font-black text-4xl mt-3">
                {homeData?.achievementHeading?.title}
              </p>
              <p className="text-tertiary-gray text-lg mt-6">
                {homeData?.achievementHeading?.description}
              </p>
              {/* Counter Details section start */}
              <motion.section className="px-4 md:px-20 w-full mt-10">
                <ul className="bg-light-gray-sky w-full grid grid-cols-1 lg:grid-cols-4 p-16 gap-16">
                  {homeData?.companySuccess?.map((each, index) => (
                    <CountUpItem
                      key={index}
                      number={each?.number}
                      title={each.title}
                    />
                  ))}
                </ul>
              </motion.section>
              {/* Counter Details section end */}
            </section>
            {/* IAchievements Section end*/}

            {/* Incubation opportunities section start */}
            <section className="bg-light-gray-sky px-4 md:px-20 py-10 md:py-20 mt-32">
              <div className="flex flex-col items-start md:items-center">
                <HeaderText title={programHeader?.heading} />
                <p className="font-montserrat uppercase font-black text-3xl md:text-4xl mt-3">
                  {programHeader?.title}
                </p>
                <p className="text-tertiary-gray text-lg mt-6">
                  {programHeader?.desc}
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-10 mt-16">
                {programs?.map((item) => (
                  <Link
                    href={`/programs/${item?.attributes?.slug}`}
                    key={item.id}
                  >
                    <ProgramCard imageHeight="md:h-[230px]" item={item} />
                  </Link>
                ))}
              </div>
              <div className="flex justify-center items-center mt-16">
                <Link
                  href="/programs"
                  className="bg-black hover:bg-black/[0.8] hover:shadow-lg h-12 px-6 text-white flex justify-center items-center gap-2"
                >
                  Know more <MdOutlineArrowForward />
                </Link>
              </div>
            </section>

            <section className="bg-white mt-14">
              <div className="px-4 overflow-x-hidden md:px-20 py-10 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-24">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  viewport={{ once: true }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: 0.3 },
                  }}
                  className="order-2 lg:order-none flex items-center"
                >
                  <div className="flex justify-start items-center flex-wrap gap-8">
                    {programHeader?.sisfBeneficiariesImage
                      ?.slice(0, 6)
                      ?.map((each, index) => (
                        <div
                          className="bg-white h-16 p-0.5 border border-secondary-gray rounded-lg flex justify-center items-center"
                          key={index}
                        >
                          {each?.link ? (
                            <Link
                              href={each.link}
                              target="_blank"
                              className="h-16 inline-block "
                            >
                              <img
                                src={each?.image?.data?.attributes?.url}
                                alt={each.alt ? each.alt : "company-logo"}
                                className="h-full object-cover"
                              />
                            </Link>
                          ) : (
                            <img
                              src={each?.image?.data?.attributes?.url}
                              alt={each.alt ? each.alt : "company-logo"}
                              className="object-cover h-full"
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  viewport={{ once: true }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: 0.3 },
                  }}
                  className="order-1 lg:order-none"
                >
                  <div className="flex gap-2">
                    <HeaderText title={homeData?.beneficiariesSisf} />
                    <HeaderText title={homeData?.beneficiariesFrame} />
                  </div>
                  <p className="font-montserrat font-black text-4xl mt-3">
                    {homeData?.beneficiariesTitle}
                  </p>
                  <p className="text-tertiary-gray text-lg mt-6 max-w-xl">
                    {homeData?.beneficiariesDesc}
                  </p>
                  <div className="mt-8">
                    <Link
                      href="/programs"
                      type="button"
                      className="bg-black hover:bg-black/[0.8] hover:shadow-lg h-12 px-6 text-white inline-flex justify-center items-center gap-2"
                    >
                      View all <MdOutlineArrowForward />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="bg-light-gray-sky px-4 md:px-20 py-10 md:py-20 mt-10 md:mt-6">
              <div className="flex flex-col md:items-center">
                <p className="font-medium px-3 py-1 text-sm bg-light-gray-sky border w-fit border-lightish-gray">
                  {homeData?.facilitiesFrame}
                </p>
                <p className="font-montserrat font-black text-4xl mt-3">
                  {homeData?.facilitiesTitle}
                </p>
                <p className="text-tertiary-gray text-xl mt-6">
                  {homeData?.facilitiesDesc}
                </p>
              </div>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-x-7 mt-16"
                initial={{ opacity: 0, translateY: 200 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {facilitiesImage?.map((each, index) => (
                  <div key={index}>
                    <div className="h-[315px] overflow-hidden">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        src={each?.attributes?.image?.data?.attributes?.url}
                        alt={each.title ? each.title : "facilities"}
                        className="object-cover hover:scale-[1.07] duration-300 w-full h-full"
                      />
                    </div>
                    <div className="w-full bg-light-gray-sky py-4">
                      <img
                        src={each?.attributes?.icon?.data?.attributes?.url}
                        alt="icon"
                      />
                      <div className="mt-2">
                        <p className="font-montserrat uppercase font-black text-lg">
                          {each?.attributes?.title}
                        </p>
                      </div>
                      <p className="font-normal text-tertiary-gray text-sm">
                        {each?.attributes?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <div className="flex justify-center items-center mt-16">
                <Link
                  href="/facilities"
                  className="bg-black hover:bg-black/[0.8] hover:shadow-lg h-12 px-6 text-white flex justify-center items-center gap-2"
                >
                  Know more <MdOutlineArrowForward />
                </Link>
              </div>
            </section>
            {/* Facilities section end */}

            {/* Blogs Section start */}
            <section className="px-4 md:px-20 py-10 md:py-20 mt-14">
              <div className="grid overflow-x-hidden grid-cols-1 lg:grid-cols-5 gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  viewport={{ once: true }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: 0.3 },
                  }}
                  className="lg:col-span-2"
                >
                  <p className="font-medium px-3 py-1 text-sm bg-light-gray-sky border w-fit border-lightish-gray">
                    {homeData?.blogFrame}
                  </p>
                  <p className="font-montserrat font-black text-4xl mt-3">
                    {homeData?.blogTitle}
                  </p>
                  <p className="text-tertiary-gray text-lg mt-6">
                    {homeData?.blogDesc}
                  </p>
                  <div className="mt-8">
                    <Link
                      href="/news-blogs"
                      type="button"
                      className="bg-black hover:bg-black/[0.8] hover:shadow-lg h-12 px-6 text-white inline-flex justify-center items-center gap-2"
                    >
                      View all post <MdOutlineArrowForward />
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  viewport={{ once: true }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: 0.3 },
                  }}
                  className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8"
                >
                  {newsData?.map((item) => (
                    <Link
                      href={`/news-blogs/news/${item?.attributes?.slug}`}
                      key={item.id}
                    >
                      <BlogCard imageHeight="h-[220px]" item={item} />
                    </Link>
                  ))}
                </motion.div>
              </div>
            </section>
            {/* Blogs Section end */}

            {/* Testimonials section start */}
            <section className="bg-light-gray-sky px-4 md:px-20 py-10 md:py-20 mt-14">
              <div className="flex flex-col md:items-center">
                <p className="font-medium px-3 py-1 text-sm bg-light-gray-sky border w-fit border-lightish-gray">
                  {homeData?.testimonialFrame}
                </p>
                <p className="font-montserrat max-w-4xl font-black md:text-center text-4xl mt-3">
                  {homeData?.testimonialTitle}
                </p>
                <p className="text-tertiary-gray text-xl mt-6 max-w-xl">
                  {homeData?.testimonialDescription}
                </p>
              </div>
              <ul className="flex justify-center items-center flex-wrap gap-8 mt-16 mx-auto">
                {imagesData?.testimonialCard?.map((each, index) => (
                  <motion.li
                    className="md:max-w-80 h-80 bg-white p-4 border border-secondary-gray"
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={index}
                  >
                    <div className="flex justify-between">
                      <div className="flex justify-start items-center gap-2">
                        <div className="h-12 w-12 overflow-hidden rounded-full">
                          {each?.profile?.data?.attributes?.url ? (
                            <img
                              src={each?.profile?.data?.attributes?.url}
                              alt={"profile"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={`/images/home/profile-logo.svg`}
                              alt={"profile"}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex flex-col justify-between">
                          <p className="font-semibold text-base">{each.Name}</p>
                          <p className="text-tertiary-gray text-sm">
                            {each.SocialMedia}
                          </p>
                        </div>
                      </div>
                      {each?.Logo?.data?.attributes?.url ? (
                        <img
                          src={each?.Logo?.data?.attributes?.url}
                          alt="company-icon"
                          className="object-cover h-3"
                        />
                      ) : (
                        <div className="bg-darker-white w-10 h-4"></div>
                      )}
                    </div>
                    <p className="text-tertiary-gray text-sm mt-4">
                      {each.description}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </section>
            {/* Testimonials section end */}

            {/* Ecosystem partners section start */}
            <section className="px-4 md:px-20 py-10 md:py-20 mt-14">
              <div className="flex flex-col md:items-center">
                <p className="font-medium px-3 py-1 text-sm bg-light-gray-sky border w-fit border-lightish-gray">
                  {homeData?.ecoSystemFrame}
                </p>
                <p className="font-montserrat font-black text-4xl mt-3">
                  {homeData?.ecoSystemTitle}
                </p>
                <p className="text-tertiary-gray md:text-center text-xl mt-6 max-w-xl">
                  {homeData?.ecoSystemDescription}
                </p>
              </div>
              <ul className="flex justify-center flex-wrap gap-8 mt-16 max-w-4xl mx-auto">
                {imagesData?.ecosystemPartnerImages?.map((each, index) => (
                  <motion.li
                    variants={listItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={index}
                    className="bg-white h-16 p-2 border border-secondary-gray rounded-2xl flex justify-center items-center"
                    key={index}
                  >
                    {each?.link ? (
                      <Link
                        href={each?.link}
                        target="_blank"
                        className="inline-block object-cover h-full"
                      >
                        <img
                          src={each?.image?.data?.attributes?.url}
                          alt={each.alt ? each.alt : "company-logo"}
                          className="object-cover h-full"
                        />
                      </Link>
                    ) : (
                      <img
                        src={each?.image?.data?.attributes?.url}
                        alt={each.alt ? each.alt : "company-logo"}
                        className="object-cover h-full"
                      />
                    )}
                  </motion.li>
                ))}
              </ul>
            </section>
            {/* Ecosystem section end */}

            {/* Companies Section start */}
            <section className="mt-14 mb-16">
              <ul className="flex justify-center items-center flex-wrap gap-11">
                {imagesData?.companyLogos?.map((each, index) => (
                  <li
                    key={index}
                    className="bg-white border-0.7px p-8 w-52 h-40 border-secondary-gray rounded-xl flex justify-center items-center"
                  >
                    {each?.link ? (
                      <Link
                        href={each?.link}
                        target="_blank"
                        className="inline-block w-full h-full"
                      >
                        <img
                          src={each?.image?.data?.attributes?.url}
                          alt={each.alt ? each.alt : "company-logo"}
                          className="w-full h-full"
                        />
                      </Link>
                    ) : (
                      <img
                        src={each?.image?.data?.attributes?.url}
                        alt={each.alt ? each.alt : "company-logo"}
                        className="w-full h-full"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </section>
            {/* Companies Section end */}
          </div>
        )}
      </PrimaryLayout>
    </>
  );
};

export default Home;
