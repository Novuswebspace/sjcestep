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
                <p className="font-montserrat font-black uppercase text-4xl mt-3">
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

              <section className=" max-w-3xl md:mx-auto ">
                <p className=" text-2xl text-black">
                  <strong>Contact Us </strong>
                </p>
                <p className=" mt-5 text-xl text-tertiary-gray">
                  Reach out to us for more information or to schedule a visit:
                </p>
                <ul className=" mt-5 text-xl list-disc text-tertiary-gray pl-8">
                  <li className="mb-1">
                    <strong className="text-black">Email: </strong>
                    <a href={`mailto:${nidhiPrayasData?.contact.email}`}>
                      {nidhiPrayasData?.contact.email}
                    </a>
                  </li>
                  <li className="mb-1">
                    <strong className="text-black">Phone: </strong>{" "}
                    <a href={`tel:${nidhiPrayasData?.contact.phoneNumber1}`}>
                      {nidhiPrayasData?.contact.phoneNumber1}
                    </a>{" "}
                    /
                    <a href={`tel:${nidhiPrayasData?.contact.phoneNumber2}`}>
                      {nidhiPrayasData?.contact.phoneNumber2}
                    </a>
                  </li>
                  <li className="mb-1">
                    <strong className="text-black">Address: </strong>
                    {nidhiPrayasData?.contact.Address}
                  </li>
                </ul>
              </section>
            </section>
          </section>
        </section>
      )}
    </PrimaryLayout>
  );
};

export default NidhiPrayas;
