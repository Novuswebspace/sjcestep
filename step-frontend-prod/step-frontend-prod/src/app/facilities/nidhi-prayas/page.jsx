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
                                <h1 className="text-5xl  leading-[3.7rem]">
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
                              return <h4 className="text-2xl">{children}</h4>;
                            case 5:
                              return (
                                <h5 className="text-xl text-center">
                                  {children}
                                </h5>
                              );
                            case 6:
                              return (
                                <h6 className="text-[18px] text-center  text-tertiary-gray">
                                  {children}
                                </h6>
                              );
                            default:
                              return <h4 className="text-2xl">{children}</h4>;
                          }
                        },
                        image: ({ image }) => (
                          <img
                            src={image?.url}
                            alt={image?.alternativeText || image?.name}
                            width={image?.width || 500}
                            height={image?.height || 300}
                            className="mx-auto my-4 max-w-full"
                          />
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

              <section className="max-w-3xl md:mx-auto rounded-2xl p-8 bg-gradient-to-br from-white via-slate-100 to-blue-50 border border-lightish-gray shadow-lg flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-primary-dark-blue mb-2 flex items-center gap-2">
                  Contact Us
                </h2>
                <ul className="flex flex-col gap-4 text-lg">
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
                <p className="text-lg text-tertiary-gray mt-2 text-center">
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
