/* eslint-disable no-undef*/
/* eslint-disable no-console*/
/* eslint-disable brace-style*/
/* eslint-disable multiline-ternary*/

"use client";
import BlogHeader from "@/components/newsBlogs/blogHeader";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import EventCard from "@/components/events/eventCard";
import ReactPaginate from "react-paginate";
import { IoArrowBackOutline } from "react-icons/io5";
import Loader from "@/components/common/loaders/primaryLoader";
import Meta from "@/components/common/Meta";
import DataLoader from "@/app/components/common/loaders/dataLoader";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const Page = () => {
  const [pastEvents, setPastEvents] = useState();
  const headingRef = useRef();

  const [pagesData, setPagesData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  //Events heading
  const fetchEventHeading = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/event`);
    return data.data.attributes;
  };

  const { data: eventHeading } = useQuery({
    queryKey: ["event-past-pagination"],
    queryFn: fetchEventHeading,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  //Past events
  const fetchRespectedEventData = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/past-events?pagination[page]=${currentPage}&pagination[pageSize]=2&populate=*`
    );
    return data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pastEvent-pagination", currentPage],
    queryFn: fetchRespectedEventData,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setPastEvents(data?.data);
    setPagesData(data?.meta?.pagination);
  }, [data]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
    headingRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <PrimaryLayout>
      <Loader />
      <Meta
        title={`STEP: Innovative Events From step, join us`}
        description="Gain insights from the comprehensive overview of our past events"
        keywords="workshops, aspiring entrepreneurs"
        ogTitle="STEP: Innovative Events from step, Join us"
        ogDescription="Gain insights from the comprehensive overview of our past events"
        ogUrl="https://www.sjcestep.in/events/past"
        twitterTitle="STEP: Innovative Events from step, Join us"
        twitterDescription="Gain insights from the comprehensive overview of our past events"
      />
      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="px-4 md:px-20">
          <section className="max-w-7xl md:mx-auto py-16 md:py-24">
            <div ref={headingRef} className="md:text-center">
              <BlogHeader
                heading={eventHeading?.pastEventTitle}
                description={eventHeading?.pastEventDescription}
              />
            </div>

            <div className="mt-16 border-b-1.5 pb-16 grid md:grid-cols-2 gap-x-7 gap-y-16">
              {pastEvents?.map((item) => (
                <Link
                  href={`/events/past/${item.attributes.slug}`}
                  key={item.id}
                >
                  <EventCard imageHeight="h-[273px]" item={item} />
                </Link>
              ))}
            </div>

            <div className="mt-5">
              <ReactPaginate
                pageCount={pagesData?.pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                previousLabel={
                  <IoArrowBackOutline className="text-[20px]" color="#475467" />
                }
                nextLabel={
                  <IoArrowBackOutline
                    className="text-[18px] -rotate-180"
                    color="#475467"
                  />
                }
                onPageChange={handlePageClick}
                containerClassName="pagination"
                pageClassName="pagination-item"
                activeClassName="active"
                previousClassName="pagination-previous"
                nextClassName="pagination-next"
                disabledClassName="pagination-disabled"
                breakClassName="pagination-break"
                // InitialPage={currentPage - 1}
              />
            </div>
          </section>
        </section>
      )}
    </PrimaryLayout>
  );
};

export default Page;
