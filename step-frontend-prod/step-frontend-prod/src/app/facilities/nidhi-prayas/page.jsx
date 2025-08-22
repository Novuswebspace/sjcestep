/* eslint-disable no-undef */
/* eslint-disable brace-style */
/* eslint-disable multiline-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console*/
/* eslint-disable indent*/

"use client";
import Loader from "@/app/components/common/loaders/primaryLoader";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import { useQuery } from "@tanstack/react-query";
// Removed unused DataLoader import
import axios from "axios";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Meta from "@/app/components/common/Meta";
import { MdOutlineArrowForward } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

const NidhiPrayas = () => {
  const fetchNidhiPrayasData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/nidhi-prayas-scheme?populate=*`
      );
      return data.data.attributes;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { data: nidhiPrayasData, isLoading } = useQuery({
    queryKey: ["nidhiPrayasData-component"],
    queryFn: fetchNidhiPrayasData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  // Info cards data (fallbacks included)
  const infoCards = [
    {
      title: "What is NIDHI?",
      desc:
        nidhiPrayasData?.whatIsNidhi ||
        "The National Initiative for Developing and Harnessing Innovations (NIDHI) is a comprehensive program by DST, Government of India. It's designed to nurture knowledge-based and technology-driven ideas and innovations into successful startups.",
    },
    {
      title: "PRAYAS Program",
      desc:
        nidhiPrayasData?.prayasProgram ||
        "Under NIDHI, the PRAYAS (Promoting and Accelerating Young and Aspiring innovators & startups) program specifically supports idea-stage entrepreneurs to build their first prototype. It provides access to physical infrastructure, technical guidance, and business mentorship.",
    },
    {
      title: "Our Partners",
      desc:
        nidhiPrayasData?.ourPartners ||
        "This initiative is proudly supported by the DST, the National Science and Technology Entrepreneurship Development Board (NSTEDB), and SINE, IIT-Mumbai, the project management unit for NIDHI-PRAYAS.",
    },
  ];

  // Core objectives (fallbacks included)
  const coreObjectives = nidhiPrayasData?.coreObjectives || [
    "Enable the translation of innovative ideas into tangible prototypes.",
    "Provide a platform for rapid experimentation and iteration on the path from idea to market.",
    "Generate novel solutions to pressing local and global challenges.",
    "Attract and empower a new generation of youth with problem-solving zeal.",
    "Serve as a pre-incubation pipeline to foster venture creation and long-term success.",
  ];

  return (
    <PrimaryLayout>
      <Meta
        title={
          nidhiPrayasData?.metaTitle ||
          "NIDHI PRAYAS: Everything you wanted to know about our facilities"
        }
        description={
          nidhiPrayasData?.metaDescription ||
          "Discover our state-of-the-art facilities designed to enhance your experience."
        }
        keywords={
          nidhiPrayasData?.metaKeywords ||
          "facilities, amenities, state-of-the-art, experience"
        }
        ogTitle={nidhiPrayasData?.metaOgTitle}
        ogDescription={nidhiPrayasData?.metaOgDescription}
        ogUrl="https://www.sjcestep.in/facilities/nidhi-prayas"
        twitterTitle={nidhiPrayasData?.metaTwitterTitle}
        twitterDescription={nidhiPrayasData?.metaTwitterDescription}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-10 md:py-20 gap-10">
            <div className="flex-1 max-w-xl">
              <p className="uppercase text-blue-500 font-semibold text-sm mb-2">
                Accelerator Program
              </p>
              <h1 className="font-montserrat font-black text-4xl md:text-5xl mb-4">
                Propel Your Startup with{" "}
                <span className="text-gradient">MSME</span>
              </h1>
              <p className="text-tertiary-gray text-lg mb-6">
                {nidhiPrayasData?.heroDescription ||
                  "Join SJCE-STEP's immersive 4-month accelerator. We provide the mentorship, resources, and network to transform your promising startup into a market leader. Culminate your journey on Demo Day, pitching directly to a curated panel of investors."}
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="#nidhi-prayas">
                  <button className="bg-blue-600 text-white rounded-lg px-6 py-2 font-semibold hover:bg-blue-700 transition">
                    Learn More
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="bg-white border border-blue-600 text-blue-600 rounded-lg px-6 py-2 font-semibold hover:bg-blue-50 transition flex items-center gap-2">
                    Book a Visit <MdOutlineArrowForward />
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center w-full">
              {nidhiPrayasData?.heroImage?.url ? (
                <img
                  src={nidhiPrayasData.heroImage.url}
                  alt="MSME Hackathon Poster"
                  className="rounded-2xl shadow-lg w-80 h-80 object-cover"
                />
              ) : (
                <div className="bg-slate-100 w-80 h-80 flex items-center justify-center rounded-2xl text-gray-400 text-lg">
                  Image loading...
                </div>
              )}
            </div>
          </section>

          {/* NIDHI-PRAYAS Initiative Overview */}
          <section
            id="nidhi-prayas"
            className="bg-white rounded-2xl shadow px-4 md:px-20 py-10 md:py-20 mt-8"
          >
            <h2 className="text-center font-montserrat font-black text-2xl md:text-4xl mb-4">
              {nidhiPrayasData?.nidhiprayasTitle || "Title coming soon..."}
            </h2>
            <p className="text-center text-tertiary-gray max-w-2xl mx-auto mb-8">
              {nidhiPrayasData?.nidhiprayasDescription ||
                "Fueling innovation from idea to impact. A national program by the Department of Science & Technology (DST) to nurture early-stage entrepreneurs."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {infoCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-slate-100"
                >
                  <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-tertiary-gray text-base">{card.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow p-6">
                  <h3 className="font-bold text-xl mb-4">
                    Core Objectives of the Grant
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {coreObjectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-300 mt-1" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="#about-us">
                    <button className="mt-6 bg-white text-blue-700 rounded-lg px-6 py-2 font-semibold hover:bg-blue-50 transition">
                      Discover More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Facilities Section */}
          <section
            id="about-us"
            className="mt-20 w-full p-3 md:max-w-3xl md:mx-auto"
          >
            {nidhiPrayasData?.content ? (
              <article className="nidhi-data prose-a:text-center prose-a:py-4 prose-a:px-3 prose-a:text-white prose-a:bg-black">
                <BlocksRenderer
                  content={nidhiPrayasData?.content}
                  blocks={{
                    paragraph: ({ children }) => (
                      <p className="text-base md:text-lg text-tertiary-gray mx-auto mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    heading: ({ children, level }) => {
                      switch (level) {
                        case 1:
                          return (
                            <h1 className="text-4xl md:text-5xl font-extrabold text-center my-6">
                              {children}
                            </h1>
                          );
                        case 2:
                          return (
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark-blue my-5">
                              {children}
                            </h2>
                          );
                        case 3:
                          return (
                            <h3 className="text-2xl md:text-3xl font-semibold my-4">
                              {children}
                            </h3>
                          );
                        case 4:
                          return (
                            <h4 className="text-xl md:text-2xl text-center font-semibold mt-6 underline underline-offset-4 decoration-slate-400">
                              {children}
                            </h4>
                          );
                        case 5:
                          return (
                            <div className="bg-slate-100 flex border-2 justify-center items-center mt-6 p-4 rounded-t-xl">
                              <h5 className="text-md text-slate-900 text-center">
                                {children}
                              </h5>
                            </div>
                          );
                        case 6:
                          return (
                            <div className="bg-slate-100 border-2 rounded-b-xl mt-0 p-3">
                              <h6 className="text-sm text-center text-tertiary-gray">
                                {children}
                              </h6>
                            </div>
                          );
                        default:
                          return (
                            <h4 className="text-xl font-semibold my-3">
                              {children}
                            </h4>
                          );
                      }
                    },
                    image: ({ image }) => (
                      <div className="w-full h-auto p-3 border-2 rounded-b-xl overflow-hidden">
                        {image?.url ? (
                          <img
                            src={image.url}
                            alt={
                              image?.alternativeText ||
                              image?.name ||
                              "Facility image"
                            }
                            width={image?.width || 500}
                            height={image?.height || 300}
                            className="mx-auto max-w-lg w-full h-auto"
                          />
                        ) : (
                          <div className="w-full h-60 bg-gray-100 text-center flex items-center justify-center text-gray-400">
                            Image coming soon...
                          </div>
                        )}
                      </div>
                    ),
                    link: ({ children, url }) => (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 transition"
                      >
                        {children}
                      </a>
                    ),
                  }}
                />
              </article>
            ) : (
              <div className="text-center text-gray-500 text-lg mt-8">
                Facility details will be updated soon.
              </div>
            )}
          </section>

          {/* Contact Us Section */}
          <section className="bg-gradient-to-br from-white via-slate-100 to-blue-50 rounded-2xl shadow p-6 md:p-10 mt-16 flex flex-col md:flex-row gap-8 items-stretch">
            <div className="flex-1 flex flex-col gap-4 justify-center">
              <h2 className=" text-2xl md:text-3xl font-bold text-primary-dark-blue mb-2 flex items-center gap-2">
                Contact Us
              </h2>
              <div className="flex items-center gap-4">
                <img
                  src="https://img.icons8.com/?size=100&id=12623&format=png&color=000000"
                  alt="email"
                  className="w-7 h-7"
                />
                <span className="font-semibold text-black">Email:</span>
                <a
                  href={`mailto:${nidhiPrayasData?.contact?.email || ""}`}
                  className="hover:underline text-blue-700"
                >
                  {nidhiPrayasData?.contact?.email || "contact@sjcestep.in"}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="https://img.icons8.com/?size=100&id=9730&format=png&color=000000"
                  alt="phone"
                  className="w-7 h-7"
                />
                <span className="font-semibold text-black">Phone:</span>
                <a
                  href={`tel:${nidhiPrayasData?.contact?.phoneNumber1 || ""}`}
                  className="hover:underline text-sm md:text-md text-blue-700"
                >
                  {nidhiPrayasData?.contact?.phoneNumber1 || "+91-1234567890"}
                </a>
                <span className="mx-1 text-gray-400">/</span>
                <a
                  href={`tel:${nidhiPrayasData?.contact?.phoneNumber2 || ""}`}
                  className="hover:underline text-sm md:text-md text-blue-700"
                >
                  {nidhiPrayasData?.contact?.phoneNumber2 || "+91-9876543210"}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="https://img.icons8.com/?size=100&id=53430&format=png&color=000000"
                  alt="address"
                  className="w-7 h-7"
                />
                <span className="font-semibold text-black">Address:</span>
                <span className="text-gray-700">
                  {nidhiPrayasData?.contact?.Address ||
                    "SJCE-STEP, Mysuru, Karnataka, India"}
                </span>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.809767673269!2d76.610438515146!3d12.316143523363506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7b67b7b7609b%3A0xb265f428562cf9ef!2sSJCE-STEP!5e0!3m2!1sen!2sin!4v1754489415340!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-64 md:w-96 md:h-64 rounded-xl shadow-lg border"
                title="SJCE-STEP Location"
              ></iframe>
            </div>
          </section>
        </>
      )}
    </PrimaryLayout>
  );
};

export default NidhiPrayas;
