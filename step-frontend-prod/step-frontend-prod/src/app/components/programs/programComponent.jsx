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

  // Split content: first paragraph for side-by-side, remaining below
  const content = programs?.attributes?.content || [];
  const firstParaIndex = Array.isArray(content)
    ? content.findIndex((b) => b.type === "paragraph")
    : -1;
  const firstParagraph = firstParaIndex !== -1 ? [content[firstParaIndex]] : [];
  const remainingContent =
    firstParaIndex !== -1
      ? [...content.slice(0, firstParaIndex), ...content.slice(firstParaIndex + 1)]
      : content;

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

          {/* Program details: Image + Description side-by-side */}
          <section className="max-w-5xl md:mx-auto mt-16 mb-20">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start rounded-2xl ring-1 ring-sky-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 shadow-lg">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl"></div>
              {/* Description */}
              <div className="order-2 md:order-1">
                {firstParagraph && firstParagraph.length > 0 && (
                  <article className="blog-data">
                    {/* Content */}
                    <div className="prose-a:text-center prose-a:py-2.5 prose-a:px-3 prose-a:text-white prose-a:bg-gradient-to-r prose-a:from-sky-600 prose-a:to-indigo-600 prose-a:rounded-md prose-a:shadow hover:prose-a:opacity-90">
                    <BlocksRenderer
                      content={firstParagraph}
                      blocks={{
                        paragraph: ({ children }) => (
                          <p className="text-lg md:text-xl text-slate-600 leading-8">{children}</p>
                        ),
                        heading: ({ children, level }) => {
                          switch (level) {
                            case 1:
                              return (
                                <h1 className="font-montserrat font-black text-4xl md:text-5xl leading-tight">
                                  {children}
                                </h1>
                              );
                            case 2:
                              return (
                                <h2 className="font-montserrat font-extrabold text-[32px] md:text-[40px] leading-tight">
                                  {children}
                                </h2>
                              );
                            case 3:
                              return (
                                <h3 className="font-montserrat font-bold text-2xl md:text-[32px]">
                                  {children}
                                </h3>
                              );
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
                        link: ({ children, url }) => {
                          const hasText = React.Children.toArray(children).some(
                            (c) => (typeof c === "string" ? c.trim() !== "" : true)
                          );
                          if (!hasText) return null;
                          return (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="!font-montserrat text-base"
                            >
                              {children}
                            </a>
                          );
                        },
                      }}
                    />
                    </div>
                  </article>
                )}
              </div>

              {/* Image */}
              <div className="order-1 md:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-sky-100">
                  <img
                    src={programs?.attributes?.image?.data?.attributes?.url}
                    className="w-full h-auto object-cover"
                    alt={programs?.attributes?.title || "program-image"}
                  />
                  {/* Corner gradient accent */}
                  <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-indigo-200/40 blur-2xl"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Remaining content below the card */}
          {remainingContent && remainingContent.length > 0 && (
            <section className="max-w-4xl md:mx-auto mb-16 md:mb-20">
              <article className="blog-data">
                <div className="prose-a:text-center prose-a:py-2.5 prose-a:px-3 prose-a:text-white prose-a:bg-gradient-to-r prose-a:from-sky-600 prose-a:to-indigo-600 prose-a:rounded-md prose-a:shadow hover:prose-a:opacity-90">
                <BlocksRenderer
                  content={remainingContent}
                  blocks={{
                    paragraph: ({ children }) => (
                      <p className="text-xl text-slate-700">{children}</p>
                    ),
                    heading: ({ children, level }) => {
                      switch (level) {
                        case 1:
                          return (
                            <div>
                            <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full mb-6"></div>
                            <h1 className="text-5xl leading-[3.7rem]">{children}</h1>
                            </div>
                          );
                        case 2:
                          return (
                            <div>
                            <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full mb-6"></div>
                            <h2 className="text-[40px] leading-[3.5rem]">{children}</h2>
                            </div>
                          );
                        case 3:
                          return (
                          <div>
                          <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full mb-6"></div>  
                          <h3 className="text-[32px] font-montserrat uppercase">{children}</h3>
                          </div>
                          );
                        case 4:
                          return (
                          <div>
                          <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full mb-6"></div>  
                          <h4 className="text-2xl">{children}</h4>
                          </div>
                          );
                        case 5:
                          return <h5 className="text-xl">{children}</h5>;
                        case 6:
                          return <h6 className="text-[18px]">{children}</h6>;
                        default:
                          return <h4 className="text-2xl">{children}</h4>;
                      }
                    },
                    link: ({ children, url }) => {
                      const hasText = React.Children.toArray(children).some(
                        (c) => (typeof c === "string" ? c.trim() !== "" : true)
                      );
                      if (!hasText) return null;
                      return (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="!font-montserrat text-base w-max"
                        >
                          {children}
                        </a>
                      );
                    },
                  }}
                />
                </div>
              </article>
            </section>
          )}
        </section>
      )}
    </PrimaryLayout>
  );
};

export default ProgramComponent;

ProgramComponent.propTypes = {
  params: PropTypes.object,
};
