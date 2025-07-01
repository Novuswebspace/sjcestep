/* eslint-disable object-curly-newline*/
/* eslint-disable multiline-ternary*/
/* eslint-disable no-undef*/
/* eslint-disable brace-style*/
/* eslint-disable indent*/

"use client";
import { PropTypes } from "prop-types";
import HeaderText from "@/app/components/common/headerText";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import BlogCard from "@/components/newsBlogs/blogCard";
import ProfileCard from "@/components/newsBlogs/profileCard";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Loader from "@/components/common/loaders/primaryLoader";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  XIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../common/loaders/dataLoader";

export const NewsBlogComponent = ({ params }) => {
  const pathname = usePathname().split("/");
  const desiredPath = `${pathname[1]}/${pathname[2]}`;

  const [urlValue, setUrlValue] = useState();

  useEffect(() => {
    const windowUrl = window?.location?.href;
    setUrlValue(windowUrl);
  }, []);

  const handleCopy = () => {
    toast.success("Successfully copied!", {
      cancel: {
        label: "Ok",
      },
      position: "top-center",
    });
  };

  const fetchBlogData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/${pathname[2]}?filters[slug][$eq]=${params.blogID}&populate=*`
    );
    return data.data[0];
  };

  const { data: blogData, isLoading } = useQuery({
    queryKey: ["blogData-details", pathname[2], params.blogID],
    queryFn: fetchBlogData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  const fetchIndividualBlogData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/${params.title}?pagination[page]=1&pagination[pageSize]=3&populate=*`
    );
    return data.data;
  };

  const { data: individualBlog } = useQuery({
    queryKey: ["Respected-blog-data", params.title],
    queryFn: fetchIndividualBlogData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  return (
    <PrimaryLayout footerColor={true}>
      <Loader />
      {isLoading ? (
        <DataLoader />
      ) : (
        <section>
          <div className="pt-16 md:pt-24 px-4 md:px-0 pb-12 grid place-items-center max-w-3xl md:mx-auto">
            <HeaderText title="Blog" />
            <p className="font-montserrat text-center md:leading-[3.5rem] uppercase mt-3 text-3xl md:text-5xl text-primary-black font-black">
              {blogData?.attributes?.title}
            </p>
            <p className="font-normal text-center text-tertiary-gray text-xl mt-6">
              {blogData?.attributes?.desc}
            </p>
            <div className="mt-8">
              <ProfileCard
                data={blogData?.attributes}
                item={blogData?.attributes?.profile}
              />
            </div>
          </div>

          <div className="mb-10 flex gap-x-3 items-center justify-end max-w-4xl mx-auto px-4 md:px-0">
            <p>Share: </p>
            <TwitterShareButton
              url={urlValue}
              title={blogData?.attributes?.title}
            >
              <span title={blogData?.attributes?.title}>
                {" "}
                <XIcon size={30} round />{" "}
              </span>
            </TwitterShareButton>

            <LinkedinShareButton
              url={urlValue}
              title={blogData?.attributes?.title}
              quote={blogData?.attributes?.title}
            >
              <span title={blogData?.attributes?.title}>
                {" "}
                <LinkedinIcon size={30} round />{" "}
              </span>
            </LinkedinShareButton>

            <FacebookShareButton
              url={urlValue}
              title={blogData?.attributes?.title}
              quote={blogData?.attributes?.title}
            >
              <span title={blogData?.attributes?.title}>
                {" "}
                <FacebookIcon size={30} round />{" "}
              </span>
            </FacebookShareButton>

            <WhatsappShareButton
              url={urlValue}
              title={blogData?.attributes?.title}
            >
              <span title={blogData?.attributes?.title}>
                {" "}
                <WhatsappIcon size={30} round />{" "}
              </span>
            </WhatsappShareButton>
            <CopyToClipboard text={urlValue}>
              <img
                title="copy link"
                src="/images/news-blogs/copy-link.svg"
                onClick={handleCopy}
                alt="copy-link"
                className="cursor-pointer"
              />
            </CopyToClipboard>
          </div>

          <div className="max-w-4xl px-4 md:px-0 md:mx-auto">
            <img
              src={
                blogData?.attributes?.image?.data?.attributes?.url &&
                `${blogData?.attributes?.image?.data?.attributes?.url}`
              }
              className="w-full h-full object-cover"
              alt={blogData?.attributes?.title}
            />
          </div>

          <section className="max-w-3xl mt-10 md:mt-24 px-4 md:mx-auto md:px-10">
            {blogData?.attributes?.RichText && (
              <article className="mb-20 blog-data prose-a:text-center prose-a:py-4 prose-a:px-3 prose-a:text-white prose-a:bg-black">
                <BlocksRenderer
                  content={blogData && blogData?.attributes?.RichText}
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

          <section className="bg-light-gray-sky px-4 py-24 my-4 md:px-20">
            <div className="max-w-7xl md:mx-auto grid lg:grid-cols-2 xl:grid-cols-3 gap-x-7 gap-y-16">
              {individualBlog?.map((item) => (
                <Link
                  href={`/${desiredPath}/${item.attributes.slug}`}
                  key={item.id}
                >
                  <BlogCard imageHeight="h-[220px]" item={item} />
                </Link>
              ))}
            </div>
          </section>
        </section>
      )}
    </PrimaryLayout>
  );
};

export default NewsBlogComponent;

NewsBlogComponent.propTypes = {
  params: PropTypes.object,
};
