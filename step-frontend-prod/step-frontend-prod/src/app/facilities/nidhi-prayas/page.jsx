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
import DataLoader from "@/app/components/common/loaders/dataLoader";
import axios from "axios";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Meta from "@/app/components/common/Meta";

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

  return (
    <PrimaryLayout>
      <Loader />
      <Meta
        title={`NIDHI PRAYAS: Everything you wanted to know about our facilities`}
        description="Discover our state-of-the-art facilities designed to enhance your experience."
        keywords="facilities, amenities, state-of-the-art, experience"
        ogTitle="NIDHI PRAYAS: Everything you wanted to know about our facilities"
        ogDescription="Discover our state-of-the-art facilities designed to enhance your experience."
        ogUrl="https://www.sjcestep.in/facilities/nidhi-prayas"
        twitterTitle="NIDHI PRAYAS: Everything you wanted to know about our facilities"
        twitterDescription="Discover our state-of-the-art facilities designed to enhance your experience."
      />
      {isLoading ? (
        <DataLoader />
      ) : (
        <section>
          {/* nidhi prayas section start */}
          <section className="bg-white px-4 lg:px-20 md:py-24 my-16 md:my-0">
            <section className="max-w-7xl md:mx-auto">
              <div className="flex flex-col md:items-center">
                <p className="font-medium px-3 py-1 text-sm bg-light-gray-sky border w-fit border-lightish-gray">
                  {nidhiPrayasData?.nidhiprayasFrame}
                </p>
                <p className="font-montserrat font-black text-gradient uppercase text-4xl mt-3">
                  {nidhiPrayasData?.nidhiprayasTitle}
                </p>
              </div>

              <section className="mt-16 max-w-3xl md:mx-auto">
                {nidhiPrayasData?.content && (
                  <article className="nidhi-data prose-a:text-center prose-a:py-4 prose-a:px-3 prose-a:text-white prose-a:bg-black">
                    <BlocksRenderer
                      content={nidhiPrayasData?.content}
                      blocks={{
                        paragraph: ({ children }) => (
                          <p className="text-xl text-tertiary-gray">
                            {children}
                          </p>
                        ),
                        heading: ({ children, level }) => {
                          switch (level) {
                            case 1:
                              return (
                                <h1 className="text-5xl leading-[3.7rem]">
                                  {children}
                                </h1>
                              );
                            case 2:
                              return (
                                <h2 className="text-[40px] leading-[3.5rem]">
                                  {children}
                                </h2>
                              );
                            case 3:
                              return (
                                <h3 className="text-[32px]">{children}</h3>
                              );
                            case 4:
                              return (
                              <h4 className="text-2xl font-montserrat mt-4 text-center underline underline-offset-4 decoration-slate-400 ">{children}</h4>
                              );
                            case 5:
                              return (
                                <div className="bg-slate-100 flex border-2 justify-center items-center mt-4 p-4 rounded-t-xl ">
                                <h5 className="text-md text-slate-900 text-center">
                                  {children}
                                </h5>
                                </div>
                              );
                            case 6:
                              return (
                                <div className="bg-slate-100 border-2 rounded-b-xl mt-0 p-3">
                                <h6 className="text-sm text-center  text-tertiary-gray">
                                  {children}
                                </h6>
                                </div>
                              );
                            default:
                              return <h4 className="text-2xl">{children}</h4>;
                          }
                        },
                        image: ({ image }) => (
                          <div className="w-full border-2 rounded-b-xl">
                          <img
                            src={image?.url}
                            alt={image?.alternativeText || image?.name}
                            width={image?.width || 500}
                            height={image?.height || 300}
                            className="mx-auto border-2 my-4 max-w-full"
                          />
                          </div>
                        ),
                        link: ({ children, url }) => (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="!font-montserrat text-base"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    />
                  </article>
                )}
              </section>

              <section className=" md:max-w-5xl md:mx-auto rounded-2xl p-8 bg-gradient-to-br from-white via-slate-100 to-blue-50 border border-lightish-gray shadow-lg flex flex-col gap-6">
                <h2 className=" text-2xl md:text-3xl font-bold text-primary-dark-blue mb-2 flex items-center gap-2">
                  Contact Us
                </h2>
                <div className=" flex md:flex-row flex-col gap-3 w-full mt-3 md:mt-4 p-1 md:p-3 items-center ">
                <ul className="flex flex-col gap-4 w-[80vw] text-md md:text-lg">
                  <li className="flex items-center gap-4 bg-white/70 rounded-lg p-4 shadow-sm">
                    <img src="https://img.icons8.com/?size=100&id=12623&format=png&color=000000" alt="email" className="w-7 h-7" />
                    <div>
                      <span className="font-semibold text-black">Email: </span>
                      <a href={`mailto:${nidhiPrayasData?.contact.email}`} className="hover:underline text-blue-700">{nidhiPrayasData?.contact.email}</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 bg-white/70 rounded-lg p-4 shadow-sm">
                    <img src="https://img.icons8.com/?size=100&id=9730&format=png&color=000000" alt="phone" className="w-7 h-7" />
                    <div>
                      <span className="font-semibold text-black">Phone: </span>
                      <a href={`tel:${nidhiPrayasData?.contact.phoneNumber1}`} className="hover:underline text-blue-700">{nidhiPrayasData?.contact.phoneNumber1}</a>
                      <span className="mx-1 text-gray-400">/</span>
                      <a href={`tel:${nidhiPrayasData?.contact.phoneNumber2}`} className="hover:underline text-blue-700">{nidhiPrayasData?.contact.phoneNumber2}</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 bg-white/70 rounded-lg p-4 shadow-sm">
                    <img src="https://img.icons8.com/?size=100&id=53430&format=png&color=000000" alt="address" className="w-7 h-7" />
                    <div>
                      <span className="font-semibold text-black">Address: </span>
                      <span className="text-gray-700">{nidhiPrayasData?.contact.Address}</span>
                    </div>
                  </li>
                </ul>
                <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.809767673269!2d76.610438515146!3d12.316143523363506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7b67b7b7609b%3A0xb265f428562cf9ef!2sSJCE-STEP!5e0!3m2!1sen!2sin!4v1754489415340!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="w-full h-full md:w-[20vw] md:h-[20vw] rounded-lg"></iframe>
                </div>
                </div>
                <p className=" text-md md:text-lg text-tertiary-gray mt-2 text-center">
                  Reach out to us for more information or to schedule a visit.
                </p>
              </section>
            </section>
          </section>
        </section>
      )}
    </PrimaryLayout>
  );
};

export default NidhiPrayas;
