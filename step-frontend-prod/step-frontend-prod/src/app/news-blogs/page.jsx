/* eslint-disable object-curly-newline*/
/* eslint-disable brace-style*/
/* eslint-disable no-undef*/
/* eslint-disable no-unused-vars*/
/* eslint-disable multiline-ternary*/
/* eslint-disable no-console */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import BlogCard from "@/components/newsBlogs/blogCard";
import BlogHeader from "@/components/newsBlogs/blogHeader";
import BannerCard from "@/components/common/bannerCard";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import { motion } from "framer-motion";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { subscribeSchema } from "../components/schemas/subscribeSchema";
import Loader from "../components/common/loaders/primaryLoader";
import { toast } from "sonner";
import Meta from "../components/common/Meta";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../components/common/loaders/dataLoader";

const Page = () => {
  // eslint-disable-next-line no-undef
  const BASEURL = process.env.NEXT_PUBLIC_URL;

  const [loading, setLoading] = useState(false);

  // Posting the data
  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
      data: {
        email: values.email,
      },
    };

    try {
      setLoading(true);
      const { data: existingEmails } = await axios.get(
        `${BASEURL}/subscribes?filters[email][$eq]=${values.email}`
      );
      console.log(existingEmails, "existingEmails");
      // If email exists, return early
      if (existingEmails?.data?.length > 0) {
        resetForm();
        toast.error("You have already subscribed with us", {
          cancel: {
            label: "Ok",
          },
          duration: 4000,
        });
        setLoading(false);
        return;
      }
      const response = await axios.post(`${BASEURL}/subscribes`, postData);
      resetForm();
      setTimeout(() => {
        toast.success("Thank you for subscribing with us", {
          cancel: {
            label: "Ok",
          },
          duration: 4000,
        });
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error posting data:", error.response.data.error.message);
      resetForm();
      setLoading(false);
      setTimeout(() => {
        toast.error("Error in sending the data", {
          cancel: {
            label: "Ok",
          },
          duration: 4000,
        });
      }, 500);
    }
  };

  //News & blogs header
  const fetchBlogHeadData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/news-blog`
    );
    return data.data.attributes;
  };

  const { data: blogHeadData } = useQuery({
    queryKey: ["blogHeadData"],
    queryFn: fetchBlogHeadData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  //News
  const fetchNewsData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/news?pagination[page]=1&pagination[pageSize]=3&populate=*`
    );
    return data.data;
  };

  const { data: newsData, isLoading } = useQuery({
    queryKey: ["newsData", 1],
    queryFn: fetchNewsData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  //Resource
  const fetchResourceData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/resources?pagination[page]=1&pagination[pageSize]=3&populate=*`
    );
    return data.data;
  };

  const { data: resourceData } = useQuery({
    queryKey: ["resourceData", 1],
    queryFn: fetchResourceData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  //Article
  const fetchArticleData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/articles?pagination[page]=1&pagination[pageSize]=3&populate=*`
    );
    return data.data;
  };

  const { data: articleData } = useQuery({
    queryKey: ["articleData", 1],
    queryFn: fetchArticleData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  return (
    <PrimaryLayout footerColor={true}>
      <Loader />
      <Meta
        title="STEP: Resources and Insights"
        description="STEP transforms innovative ideas into market leaders"
        keywords="Innovation, Incubation Opportunities"
        ogTitle="STEP: Resources and Insights"
        ogDescription="STEP transforms innovative ideas into market leaders"
        ogUrl="https://www.sjcestep.in/news-blogs"
        twitterTitle="STEP: Resources and Insights"
        twitterDescription="STEP transforms innovative ideas into market leaders"
      />
      {/* news banner */}
      {isLoading ? (
        <DataLoader />
      ) : (
        <section>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, type: "tween" },
            }}
            className="grid max-w-3xl md:mx-auto px-4 md:px-0 place-items-start md:place-items-center pt-16 md:pt-24 pb-28"
          >
            <BannerCard item={blogHeadData} />

            <Formik
              initialValues={{ email: "" }}
              validationSchema={subscribeSchema}
              onSubmit={handleSubmit}
            >
              {({ errors }) => (
                <Form className="w-full">
                  <div className="mt-12 w-full flex flex-col md:flex-row justify-center gap-x-4">
                    <div>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        className="border-1 border-light-gray w-full text-base h-12 font-normal md:w-[345px] focus:ouline-none focus:border-1 focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet py-2 pl-3 placeholder:text-light-blue-gray"
                      />
                      {errors.email && (
                        <p className="text-red-400 pl-2 mt-1 text-sm font-medium">
                          {errors.email}*
                        </p>
                      )}
                      <p className="font-normal mt-1.5 text-sm text-tertiary-gray">
                        We care about your data in our{" "}
                        <Link
                          href="/privacy-policy"
                          className="border-b-1.5 border-b-tertiary-gray"
                        >
                          privacy policy.
                        </Link>
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`${loading ? "bg-sand-gray text-white cursor-not-allowed" : "bg-black text-white cursor-pointer hover:bg-black/[0.8] hover:shadow-lg"}  mt-3 md:mt-0 w-full md:w-auto text-base px-5 h-12 font-semibold`}
                    >
                      {loading ? "Subscribing..." : "Subscribe"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </motion.div>

          {/* news section */}

          <section
            className={`bg-light-gray-sky px-4 md:px-20 pt-24 pb-32 mb-10`}
          >
            <div className="max-w-7xl md:mx-auto">
              <BlogHeader
                heading={blogHeadData?.newsTitle}
                description={blogHeadData?.newsDescription}
                path="/news-blogs/news"
              />

              <div className="mt-10 gap-x-7 gap-y-16 grid lg:grid-cols-2 xl:grid-cols-3">
                {newsData?.map((item) => (
                  <Link
                    href={`/news-blogs/news/${item.attributes.slug}`}
                    key={item.id}
                  >
                    <BlogCard imageHeight="h-[220px]" item={item} />
                  </Link>
                ))}
              </div>
              <Link
                href="/news-blogs/news"
                className="mt-10 bg-black text-center text-white w-full text-sm font-semibold inline-flex items-center justify-center h-12 md:hidden"
              >
                View all posts
              </Link>
            </div>
          </section>

          {/* resource section */}

          <section className={`px-4 md:px-20 pt-24 pb-32 mb-10`}>
            <div className="max-w-7xl md:mx-auto">
              <BlogHeader
                heading={blogHeadData?.resourceTitle}
                description={blogHeadData?.resourceDescription}
                path="/news-blogs/resources"
              />

              <div className="mt-10 gap-x-7 gap-y-16 grid lg:grid-cols-2 xl:grid-cols-3">
                {resourceData?.map((item) => (
                  <Link
                    href={`/news-blogs/resources/${item.attributes.slug}`}
                    key={item.id}
                  >
                    <BlogCard imageHeight="h-[220px]" item={item} />
                  </Link>
                ))}
              </div>
              <Link
                href="/news-blogs/resources"
                className="mt-10 text-center bg-black text-white w-full text-sm font-semibold inline-flex items-center justify-center h-12 md:hidden"
              >
                View all posts
              </Link>
            </div>
          </section>

          {/* article section */}

          <section
            className={`bg-light-gray-sky px-4 md:px-20 pt-24 pb-32 mb-20`}
          >
            <div className="max-w-7xl md:mx-auto">
              <BlogHeader
                heading={blogHeadData?.articleTitle}
                description={blogHeadData?.articleDescription}
                path="/news-blogs/articles"
              />

              <div className="mt-10 gap-x-7 gap-y-16 grid lg:grid-cols-2 xl:grid-cols-3">
                {articleData?.map((item) => (
                  <Link
                    href={`/news-blogs/articles/${item.attributes.slug}`}
                    key={item.id}
                  >
                    <BlogCard imageHeight="h-[220px]" item={item} />
                  </Link>
                ))}
              </div>
              <Link
                href="/news-blogs/articles"
                className="mt-10 text-center bg-black text-white w-full text-sm font-semibold inline-flex items-center justify-center h-12 md:hidden"
              >
                View all posts
              </Link>
            </div>
          </section>
        </section>
      )}
    </PrimaryLayout>
  );
};

export default Page;
