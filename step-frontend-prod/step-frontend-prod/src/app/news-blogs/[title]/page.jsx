"use client";
/* eslint-disable object-curly-newline*/
/* eslint-disable no-undef*/
/* eslint-disable no-console*/
/* eslint-disable brace-style*/
/* eslint-disable multiline-ternary*/

import { PropTypes } from "prop-types";
import BlogCard from "@/components/newsBlogs/blogCard";
import React, { useEffect, useRef, useState } from "react";
import BannerCard from "@/components/common/bannerCard";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { IoArrowBackOutline } from "react-icons/io5";
import Loader from "@/components/common/loaders/primaryLoader";
import Meta from "@/components/common/Meta";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import DataLoader from "@/components/common/loaders/dataLoader";

const Page = ({ params }) => {
  const pathname = usePathname();
  const headingRef = useRef();

  const [blogData, setBlogData] = useState();

  const [pagesData, setPagesData] = useState();

  const [currentPage, setCurrentPage] = useState(1);

  const [currentHeading, setCurrentHeading] = useState(null);

  const fetchRespectedBlogData = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/${params.title}?pagination[page]=${currentPage}&pagination[pageSize]=3&populate=*`
    );
    return data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["blog-title", currentPage],
    queryFn: fetchRespectedBlogData,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setBlogData(data?.data);
    setPagesData(data?.meta?.pagination);
  }, [data]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
    headingRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Fetching the banner text
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/resource-heading?populate=*`)
      .then((res) => {
        const currentHeading = res?.data?.data?.attributes?.Resource?.find(
          (item) => item.title.toLowerCase() === params.title
        );
        setCurrentHeading(currentHeading);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PrimaryLayout>
      <Loader />
      <Meta
        title="STEP: Discover latest Blogs"
        description="Discover the latest insights and stories on our blog."
        keywords="Innovation, Incubation Opportunities"
        ogTitle="STEP: Resources AND Insights"
        ogDescription="Discover the latest insights and stories on our blog."
        ogUrl="https://www.sjcestep.in/news-blogs"
        twitterTitle="STEP: Resources AND Insights"
        twitterDescription="Discover the latest insights and stories on our blog."
      />
      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="px-4 md:px-20 pb-16 md:pb-32">
          <section
            ref={headingRef}
            className="grid max-w-3xl md:mx-auto place-items-start md:place-items-center pt-16 md:pt-24 pb-10 md:pb-14"
          >
            <BannerCard
              item={{
                heading: currentHeading?.title,
                title: currentHeading?.title,
                desc: currentHeading?.description,
              }}
            />
          </section>

          <section className="max-w-7xl md:mx-auto md:px-16 lg:px-32">
            <Link
              href={`${pathname}/${blogData && blogData[0]?.attributes.slug}`}
            >
              <BlogCard item={blogData && blogData[0]} />
            </Link>
          </section>

          <section className="max-w-7xl md:mx-auto mt-16 pb-16 border-b-1.5 grid lg:grid-cols-2 xl:grid-cols-3 gap-x-7 gap-y-16">
            {blogData?.map((item) => (
              <Link href={`${pathname}/${item.attributes.slug}`} key={item.id}>
                <BlogCard imageHeight="h-[218px]" item={item} />
              </Link>
            ))}
          </section>

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
      )}
    </PrimaryLayout>
  );
};

export default Page;

Page.propTypes = {
  params: PropTypes.object,
};
