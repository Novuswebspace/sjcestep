/* eslint-disable brace-style*/
/* eslint-disable no-undef*/
/* eslint-disable object-curly-newline*/
/* eslint-disable multiline-ternary*/
/* eslint-disable indent*/
"use client";
import { PropTypes } from "prop-types";
import BannerCard from "@/components/common/bannerCard";
import ImageFrame from "@/components/common/chips/imageFrame";
import EventCard from "@/app/components/events/eventCard";
import PrimaryLayout from "@/app/components/layouts/primaryLayout";
import BlogHeader from "@/app/components/newsBlogs/blogHeader";
import Link from "next/link";
import React from "react";
import axios from "axios";
import HeaderText from "@/components/common/headerText";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Loader from "@/components/common/loaders/primaryLoader";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../common/loaders/dataLoader";

const LatestEventComponent = ({ params }) => {
  //Upcoming single event
  const fetchIndividualEvent = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/upcoming-events?filters[slug][$eq]=${params.id}&populate=*`
    );
    return data.data[0];
  };

  const { data: individualEvent } = useQuery({
    queryKey: ["individual-latest-Event", params.id],
    queryFn: fetchIndividualEvent,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: !!params.id,
  });

  //Upcoming events
  const fetchUpcomingEvents = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/upcoming-events?pagination[page]=1&pagination[pageSize]=2&populate=*`
    );
    return data.data;
  };

  const { data: upcominEvents, isLoading } = useQuery({
    queryKey: ["latestEvents-In-Detailspage-InLatest"],
    queryFn: fetchUpcomingEvents,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  //Past events
  const fetchPastEvents = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/past-events?pagination[page]=1&pagination[pageSize]=2&populate=*`
    );
    return data.data;
  };

  const { data: pastEvents } = useQuery({
    queryKey: ["pastEvents-In-DetailsPage-InLatest"],
    queryFn: fetchPastEvents,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  //Events heading
  const fetchEventHeading = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/event`);
    return data.data.attributes;
  };

  const { data: eventHeading } = useQuery({
    queryKey: ["eventHeading-in-detailsPage-Latest"],
    queryFn: fetchEventHeading,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  return (
    <PrimaryLayout>
      <Loader />
      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="px-5 md:px-20">
          {/* banner */}
          <section className="grid place-items-center">
            <div className="max-w-3xl grid place-items-start md:place-items-center pt-16 md:pt-24">
              <HeaderText title="Events" />
              <BannerCard
                textPosition="md:text-center"
                item={individualEvent?.attributes}
              />

              <div className="mt-8 flex items-center gap-x-4">
                <ImageFrame
                  data={individualEvent?.attributes?.date}
                  img="/images/events/calendar.svg"
                />
                <ImageFrame
                  theme="light"
                  data={individualEvent?.attributes?.place}
                  img="/images/events/location.svg"
                />
              </div>
            </div>
          </section>

          {/* image */}
          <div className="mt-16 max-w-4xl md:mx-auto">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src={
                individualEvent?.attributes?.image?.data?.attributes?.url &&
                `${individualEvent?.attributes?.image?.data?.attributes?.url}`
              }
              className="h-full w-full"
              alt={params?.id}
            />
          </div>

          {/* description */}
          <section className="max-w-3xl mt-14 md:mt-20 md:mx-auto">
            {individualEvent?.attributes?.content && (
              <article className="mb-20 blog-data prose-a:text-center prose-a:py-4 prose-a:px-3 prose-a:text-white prose-a:bg-black">
                <BlocksRenderer
                  content={
                    individualEvent && individualEvent?.attributes?.content
                  }
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

          <section className="max-w-7xl md:mx-auto flex flex-col mt-24 md:mt-48">
            <div>
              <BlogHeader
                heading={eventHeading?.upcomingEventTitle}
                description={eventHeading?.upcomingEventDescription}
                path="/events/latest"
              />

              <div className="mt-7 grid md:grid-cols-2 gap-x-7 gap-y-16">
                {upcominEvents?.map((item) => (
                  <Link
                    href={`/events/latest/${item.attributes.slug}`}
                    key={item.id}
                  >
                    <EventCard imageHeight="h-[273px]" item={item} />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-7xl mt-16 md:mt-32 md:mx-auto flex flex-col mb-16 md:mb-32">
            <div>
              <BlogHeader
                heading={eventHeading?.pastEventTitle}
                description={eventHeading?.pastEventDescription}
                path="/events/past"
              />

              <div className="mt-7 grid md:grid-cols-2 gap-x-7 gap-y-16">
                {pastEvents?.map((item) => (
                  <Link
                    href={`/events/past/${item.attributes.slug}`}
                    key={item.id}
                  >
                    <EventCard imageHeight="h-[273px]" item={item} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </section>
      )}
    </PrimaryLayout>
  );
};

export default LatestEventComponent;

LatestEventComponent.propTypes = {
  params: PropTypes.object,
};
