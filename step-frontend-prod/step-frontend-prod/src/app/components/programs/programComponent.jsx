/* eslint-disable object-curly-newline*/
/* eslint-disable no-undef*/
/* eslint-disable multiline-ternary*/
/* eslint-disable brace-style*/
/* eslint-disable indent*/

"use client";
import { PropTypes } from "prop-types";
import BannerCard from "@/components/common/bannerCard";
import React from "react";
import axios from "axios";
import HeaderText from "@/components/common/headerText";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Loader from "@/components/common/loaders/primaryLoader";
import PrimaryLayout from "../layouts/primaryLayout";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../common/loaders/dataLoader";

export const ProgramComponent = ({ params }) => {
  const fetchProgramBySlug = async (slug) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/programs?filters[slug][$eq]=${slug}&populate=*`
    );
    return data.data[0];
  };

  const { data: programs, isLoading: loading } = useQuery({
    queryKey: ["program-individualdata", params?.id],
    queryFn: () => fetchProgramBySlug(params.id),
    enabled: !!params?.id,
  });

  return (
    <PrimaryLayout>
      <Loader />
      {loading ? (
        <DataLoader />
      ) : (
        <section className="px-4 md:px-0">
          <section className="grid max-w-3xl md:mx-auto place-items-start md:place-items-center pt-16 md:pt-24">
            <HeaderText title="Scheme" />
            <BannerCard
              textPosition="md:text-center"
              item={programs?.attributes}
            />
          </section>

          {/* image */}
          <div className="mt-16 max-w-4xl md:mx-auto mb-20 ">
            <img
              src={programs?.attributes?.image?.data?.attributes?.url}
              className="h-full w-full"
              alt="event-image"
            />
          </div>

          <section className="max-w-3xl md:mx-auto">
            {programs?.attributes?.content && (
              <article className="mb-16 md:mb-20 blog-data prose-a:text-center prose-a:py-4 prose-a:px-3 prose-a:text-white prose-a:bg-black">
                <BlocksRenderer
                  content={programs && programs?.attributes?.content}
                  blocks={{
                    // You can use the default components to set class names.
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
                            <h2 className="text-[40px] leading-[3.5rem]">
                              {children}
                            </h2>
                          );
                        case 3:
                          return <h3 className="text-[32px]">{children}</h3>;
                        case 4:
                          return <h4 className="text-2xl">{children}</h4>;
                        case 5:
                          return <h5 className="text-xl">{children}</h5>;
                        case 6:
                          return <h6 className="text-[18px]">{children}</h6>;
                        default:
                          return <h4 className="text-2xl">{children}</h4>;
                      }
                    },
                    // For links, you may want to use the component from your router or framework
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
        </section>
      )}
    </PrimaryLayout>
  );
};

export default ProgramComponent;

ProgramComponent.propTypes = {
  params: PropTypes.object,
};
