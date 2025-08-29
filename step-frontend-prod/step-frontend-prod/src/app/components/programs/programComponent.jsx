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
import { FaCheckCircle } from "react-icons/fa";

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

  // Map backend fields
  const attrs = programs?.attributes || {};
  const {
    title,
    desc,
    alt,
    briefing_heading,
    briefing,
    highlights,
    objectives,
  } = attrs;
  const imageUrl = attrs?.image?.data?.attributes?.url;
  const highlightItems = React.useMemo(
    () =>
      typeof highlights === "string"
        ? highlights
            .split(/\r?\n+/)
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    [highlights]
  );

  return (
    <PrimaryLayout>
      <Loader />
      {loading ? (
        <DataLoader />
      ) : (
        <section className="px-4 md:px-0">
          {/* Title */}
          <section className="max-w-5xl md:mx-auto pt-10 md:pt-16">
            {title && (
              <h1 className="font-montserrat font-black text-4xl md:text-5xl leading-tight text-slate-900">
                {title}
              </h1>
            )}
          </section>

          {/* Program details: Image + Description side-by-side */}
          <section className="max-w-5xl md:mx-auto mt-16 mb-20">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start rounded-2xl ring-1 ring-sky-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 shadow-lg">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl"></div>
              {/* Description */}
              <div className="order-2 md:order-1">
                {desc && (
                  <article>
                    <p className="text-lg md:text-xl text-slate-600 leading-8">
                      {desc}
                    </p>
                  </article>
                )}
              </div>

              {/* Image */}
              <div className="order-1 md:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-sky-100">
                  <img
                    src={imageUrl}
                    className="w-full h-auto object-cover"
                    alt={alt || title || "program-image"}
                  />
                  {/* Corner gradient accent */}
                  <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-indigo-200/40 blur-2xl"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Briefing & Highlights section */}
          {(briefing || (highlightItems && highlightItems.length > 0)) && (
            <section className="max-w-5xl md:mx-auto mb-16 md:mb-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Briefing */}
              <div className="rounded-2xl bg-white/70 ring-1 ring-slate-100 shadow-sm p-5 md:p-6">
                {(briefing_heading || "Briefing") && (
                  <div>
                    <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full mb-6"></div>
                    <h3 className="text-[28px] md:text-[32px] font-montserrat uppercase text-slate-800">
                      {briefing_heading || "Briefing"}
                    </h3>
                  </div>
                )}
                {briefing && (
                  <p className="mt-4 text-base md:text-lg text-slate-700 leading-7 whitespace-pre-line">
                    {briefing}
                  </p>
                )}
              </div>

              {/* Highlights */}
              {highlightItems && highlightItems.length > 0 && (
                <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-600 text-white shadow-lg p-5 md:p-6">
                  <h3 className="text-[28px] md:text-[32px] font-montserrat">
                    Program Highlights
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {highlightItems.map((item, idx) => (
                      <li key={`hl-${idx}`} className="flex gap-3">
                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                          >
                            <path
                              d="M20 7L9 18L4 13"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="text-white/95">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Objectives rich text */}
          {Array.isArray(objectives) && objectives.length > 0 && (
            <section className="max-w-5xl md:mx-auto mb-16 md:mb-20 ">
              <article className="blog-data bg-gradient-to-br from-blue-500 to-cyan-500 p-4 text-white rounded-2xl">
                <div className="prose-a:text-center text-white prose-a:py-2.5 prose-a:px-3 prose-a:text-white prose-a:bg-gradient-to-r prose-a:from-sky-600 prose-a:to-indigo-600 prose-a:rounded-md prose-a:shadow hover:prose-a:opacity-90">
                  <BlocksRenderer
                    content={objectives}
                    blocks={{
                      paragraph: ({ children }) => (
                        <p className="text-xl text-white">{children}</p>
                      ),
                      list: ({ children, format }) =>
                        format === "ordered" ? (
                          <ol className="list-decimal pl-6 space-y-3">
                            {children}
                          </ol>
                        ) : (
                          <ul className="list-none pl-0 space-y-3">
                            {children}
                          </ul>
                        ),
                      listItem: ({ children }) => (
                        <li className="flex items-start gap-3">
                          <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
                          <div className="leading-7 text-white">{children}</div>
                        </li>
                      ),
                      "list-item": ({ children }) => (
                        <li className="flex items-start gap-3">
                          <FaCheckCircle className="text-green-300 mt-1 shrink-0" />
                          <div className="leading-7 text-white">{children}</div>
                        </li>
                      ),
                      heading: ({ children, level }) => {
                        switch (level) {
                          case 1:
                            return (
                              <div>
                                <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full mb-6"></div>
                                <h1 className="text-5xl leading-[3.7rem]">
                                  {children}
                                </h1>
                              </div>
                            );
                          case 2:
                            return (
                              <div>
                                <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full mb-6"></div>
                                <h2 className="text-[40px] leading-[3.5rem]">
                                  {children}
                                </h2>
                              </div>
                            );
                          case 3:
                            return (
                              <div>
                                <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full mb-6"></div>
                                <h3 className="text-[32px] font-montserrat uppercase">
                                  {children}
                                </h3>
                              </div>
                            );
                          default:
                            return (
                              <h4 className="text-2xl text-white">
                                {children}
                              </h4>
                            );
                        }
                      },
                      link: ({ children, url }) => {
                        const hasText = React.Children.toArray(children).some(
                          (c) =>
                            typeof c === "string" ? c.trim() !== "" : true
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
