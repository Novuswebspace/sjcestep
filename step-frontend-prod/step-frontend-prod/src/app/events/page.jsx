/* eslint-disable no-undef*/
/* eslint-disable brace-style*/
/* eslint-disable multiline-ternary*/

"use client";
import React from "react";
import BlogHeader from "../components/newsBlogs/blogHeader";
import EventCard from "../components/events/eventCard";
import FeaturedEventsSlider from "../components/events/featuredEventsSlider";
import Link from "next/link";
import PrimaryLayout from "../components/layouts/primaryLayout";
import axios from "axios";
import Loader from "../components/common/loaders/primaryLoader";
import Meta from "../components/common/Meta";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../components/common/loaders/dataLoader";

const Page = () => {
  //Events heading
  const fetchEventHeading = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/event`);
    return data.data.attributes;
  };

  const { data: eventHeading } = useQuery({
    queryKey: ["eventHeading"],
    queryFn: fetchEventHeading,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  // Removed unused featuredEvents query

  //Upcoming events
  const fetchUpcomingEvents = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/upcoming-events?pagination[page]=1&pagination[pageSize]=2&populate=*`
    );
    return data.data;
  };

  const { data: upcominEvents, isLoading } = useQuery({
    queryKey: ["upcomingEvents", 1],
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
    queryKey: ["pastEvents", 1],
    queryFn: fetchPastEvents,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  return (
    <PrimaryLayout>
      <Loader />
      <Meta
        title={`STEP: Innovative Events from STEP`}
        description="Join us for the event, a celebration of music, food and community. Don't miss out on the fun!"
        keywords="celebration of music, food and community"
        ogTitle="STEP: Innovative Events from STEP"
        ogDescription="Join us for the event, a celebration of music, food and community. Don't miss out on the fun!"
        ogUrl="https://www.sjcestep.in/events"
        twitterTitle="STEP: Innovative Events from STEP"
        twitterDescription="Join us for the event, a celebration of music, food and community. Don't miss out on the fun!"
      />
      {isLoading ? (
        <DataLoader />
      ) : (
        <>
          {/* Featured Events Slider */}
          <FeaturedEventsSlider />

          <section className="px-4 md:px-20 py-16 md:py-24">
            <section className="max-w-7xl md:mx-auto flex flex-col">
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
                <Link
                  href="/events/latest"
                  className="mt-10 text-center bg-black text-white w-full text-sm font-semibold inline-flex items-center justify-center h-12 md:hidden"
                >
                  View all posts
                </Link>
              </div>
            </section>

            <section className="max-w-7xl p-3 mt-20 md:mt-32 md:mx-auto flex flex-col">
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
              <Link
                href="/events/past"
                className="mt-10 text-center bg-black text-white w-full text-sm font-semibold inline-flex items-center justify-center h-12 md:hidden"
              >
                View all posts
              </Link>
            </section>
          </section>
        </>
      )}
    </PrimaryLayout>
  );
};

export default Page;
