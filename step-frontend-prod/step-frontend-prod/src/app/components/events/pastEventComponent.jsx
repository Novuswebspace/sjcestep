/* eslint-disable no-undef*/
/* eslint-disable brace-style*/
/* eslint-disable object-curly-newline*/
/* eslint-disable multiline-ternary*/
/* eslint-disable indent*/

"use client";
import { PropTypes } from "prop-types";
import ImageFrame from "@/components/common/chips/imageFrame";
import HeaderText from "@/components/common/headerText";
import BannerCard from "@/components/common/bannerCard";
import EventCard from "@/components/events/eventCard";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import BlogHeader from "@/components/newsBlogs/blogHeader";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Loader from "@/components/common/loaders/primaryLoader";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../common/loaders/dataLoader";
import { IoArrowBackOutline } from "react-icons/io5";

const PastEventComponent = ({ params }) => {
  //Past single event
  const fetchIndividualEvent = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/past-events?filters[slug][$eq]=${params.id}&populate=*`
    );
    return data.data[0];
  };

  const { data: individualEvent } = useQuery({
    queryKey: ["individual-past-Event", params.id],
    queryFn: fetchIndividualEvent,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: !!params.id,
  });

  //Past event images
  const fetchEventImages = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/past-events?filters[slug][$eq]=${params.id}&populate[EventImages][populate]=*`
    );
    return data.data[0].attributes;
  };

  const { data: eventImages } = useQuery({
    queryKey: ["eventImages-Details", params.id],
    queryFn: fetchEventImages,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  //Upcoming events
  const fetchUpcomingEvents = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/upcoming-events?pagination[page]=1&pagination[pageSize]=2&populate=*`
    );
    return data.data;
  };

  const { data: upcominEvents, isLoading } = useQuery({
    queryKey: ["pastEvents-In-Detailspage"],
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
    queryKey: ["pastEvents-In-DetailsPage-Inpast"],
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
    queryKey: ["eventHeading-in-detailsPage-Past"],
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
        <section className="px-4 md:px-0">
          {/* Back to Events Button */}
          <div className="pt-16 md:pt-24 mb-8 px-4 md:px-20">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors duration-300 font-medium"
            >
              <IoArrowBackOutline className="text-xl" />
              Back to Events
            </Link>
          </div>

          {/* banner */}
          <section className="grid place-items-start md:place-items-center">
            <div className="max-w-3xl grid place-items-start md:place-items-center pt-16 md:pt-24">
              <HeaderText title="Events" />
              <BannerCard
                textPosition="md:text-center"
                item={individualEvent?.attributes}
              />

              <div className="mt-8 flex items-center justify-center flex-wrap gap-4">
                <ImageFrame data="Past Event" />
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
            {individualEvent?.attributes?.image?.data?.attributes?.url && (
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src={individualEvent?.attributes?.image?.data?.attributes?.url}
                className="h-full w-full"
                alt={params?.id}
              />
            )}
          </div>

          {/* description */}
          <section className="max-w-2xl mt-14 md:mt-20 md:mx-auto">
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

          {/* image gallery */}
          {eventImages?.EventImages.length > 0 && (
            <section className="md:px-14">
              <div className="gallery flex flex-col gap-y-5 max-w-7xl md:mx-auto md:grid mt-28">
                {eventImages?.EventImages.map((item, index) => (
                  <div key={index} className={`item overflow-hidden`}>
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={item?.image?.data?.attributes?.url}
                      className="w-full object-cover h-full hover:scale-[1.07] duration-300"
                      alt={item.alt ? item.alt : "event-images"}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section
            className={`md:px-20 ${eventImages?.EventImages.length > 0 ? "pt-28 md:pt-48" : "pt-12"} pb-16`}
          >
            <div className="max-w-7xl md:mx-auto flex flex-col">
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
            </div>

            <div className="max-w-7xl mt-16 md:mt-32 md:mx-auto flex flex-col">
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
            </div>
          </section>
        </section>
      )}
    </PrimaryLayout>
  );
};

export default PastEventComponent;

PastEventComponent.propTypes = {
  params: PropTypes.object,
};
