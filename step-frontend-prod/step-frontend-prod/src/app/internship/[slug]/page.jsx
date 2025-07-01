/* eslint-disable no-console */
/* eslint-disable brace-style */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable multiline-ternary */
"use client";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Loader from "@/components/common/loaders/primaryLoader";
import Meta from "@/components/common/Meta";
import DataLoader from "@/app/components/common/loaders/dataLoader";

export default function page({ params }) {
  const { slug } = params;
  const router = useRouter();

  const [individualData, setIndividualData] = useState();
  const currentId = useSearchParams().get("id");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/internship-courses?filters[slug][$eq]=${slug}&populate=*`
        );
        const internships = data.data.data[0].attributes.InternshipData;
        const filteredInternship = internships.find(
          (internship) => internship.id === parseInt(currentId)
        );
        setIndividualData(filteredInternship);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <PrimaryLayout>
      <Loader />
      <Meta
        title={`STEP Careers | Application form for the Post`}
        description="STEP is seeking exceptional talent to build something truly groundbreaking—an innovation that will shape the future."
        keywords="Innovation, Brightest,Careers"
        ogTitle={`STEP Careers | Application form for the Post`}
        ogDescription="STEP is seeking exceptional talent to build something truly groundbreaking—an innovation that will shape the future."
        ogUrl={`https://www.sjcestep.in/internship`}
        twitterTitle={`STEP Careers | Application form for the Post`}
        twitterDescription="STEP is seeking exceptional talent to build something truly groundbreaking—an innovation that will shape the future."
      />
      {loading ? (
        <DataLoader />
      ) : (
        <main className="max-w-8xl mx-auto px-4 md:px-20 mt-16 md:mt-24">
          <span className="inline-block text-sm font-medium border border-lightish-gray bg-light-gray-sky px-3 py-1">
            Company & JD
          </span>
          <h4 className="text-3xl lg:text-4xl font-black mt-5 uppercase">
            {individualData?.jobName} at {individualData?.company}
          </h4>
          <p className="mt-8 font-normal text-lg lg:text-xl text-tertiary-gray lg:w-3/5 leading-7 lg:leading-7.5">
            {individualData?.jobDesc}
          </p>
          <section className="flex flex-col lg:flex-row md:items-start mt-16 lg:justify-between gap-x-4">
            <div className="text-base lg:text-lg basis-[60%] leading-6 lg:leading-7 font-normal mb-20">
              {individualData?.content && (
                <article className="md:mb-20 prose-a:text-center prose-a:py-4 prose-a:px-3 prose-a:text-white prose-a:bg-black">
                  <BlocksRenderer
                    content={individualData && individualData?.content}
                    blocks={{
                      // You can use the default components to set class names...
                      paragraph: ({ children }) => (
                        <p className="text-xl text-tertiary-gray">{children}</p>
                      ),
                      // ...or point to a design system
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
                              <h1 className="text-[40px] leading-[3.5rem]">
                                {children}
                              </h1>
                            );
                          case 3:
                            return <h3 className="text-[32px]">{children}</h3>;
                          case 4:
                            return <h4 className="text-2xl">{children}</h4>;
                          case 5:
                            return <h5 className="text-xl">{children}</h5>;
                          case 6:
                            return <h6 className="text-base">{children}</h6>;
                          default:
                            return <h4 className="text-2xl">{children}</h4>;
                        }
                      },
                      // For links, you may want to use the component from your router or framework
                      link: ({ children, url }) => (
                        <a href={url} className="!font-montserrat text-base">
                          {children}
                        </a>
                      ),
                    }}
                  />
                </article>
              )}
            </div>
            {/* apply card */}
            <div className="border border-secondary-gray bg-light-gray-sky py-8 px-6 basis-2/5 lg:basis-[30%] shadow-sm lg:sticky top-16 bottom-5 mb-16 md:mb-20">
              <div className="border border-secondary-gray bg-light-gray-sky h-12 w-12 flex items-center justify-center shadow-sm">
                <img src="/images/internship/send.svg" alt="send icon" />
              </div>
              <p className="font-semibold text-2xl mt-8">Apply</p>
              <p className="text-lg mt-3 text-tertiary-gray">
                <span className="font-semibold text-black">Duration:</span>{" "}
                {individualData?.duration}
              </p>
              <p className="text-lg mt-3 text-tertiary-gray">
                <span className="font-semibold text-black">Vacancy:</span>{" "}
                {individualData?.vacancy}
              </p>
              <p className="text-lg mt-3 text-tertiary-gray">
                <span className="font-semibold text-black">Location:</span>{" "}
                {individualData?.place}
              </p>
              <button
                onClick={() =>
                  router.push(
                    `/internship/${currentId}/application-form?post=${individualData?.jobName}`
                  )
                }
                className="bg-black hover:bg-black/[0.8] hover:shadow-lg text-white text-base font-semibold w-full mt-6 py-3"
              >
                Apply Now
              </button>
            </div>
          </section>
        </main>
      )}
    </PrimaryLayout>
  );
}
