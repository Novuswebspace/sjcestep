/* eslint-disable no-undef*/
/* eslint-disable no-console*/
/* eslint-disable brace-style*/
/* eslint-disable object-curly-newline*/

import { PropTypes } from "prop-types";
import axios from "axios";
import NewsBlogComponent from "@/components/newsBlogs/newsBlogComponent";

export async function generateMetadata({ params }) {
  let blogData;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/${params.title}?filters[slug][$eq]=${params.blogID}&populate=*`
    );
    blogData = response.data.data[0];
  } catch (error) {
    console.log(error);
  }

  return {
    title: blogData?.attributes?.title
      ? `STEP: ${blogData.attributes.title}`
      : "STEP: Resources and Insights",
    description: blogData?.attributes?.desc || "STEP: Resources and Insights",
    keywords: "innovative Programs,Resources and Insights,transforms",
    openGraph: {
      title: blogData?.attributes?.title,
      description: blogData?.attributes?.desc,
      images: [
        {
          url: blogData?.attributes?.image?.data?.attributes?.url,
        },
      ],
      url: `https://www.sjcestep.in/news-blogs/${params.title}/${params.blogID}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blogData?.attributes?.title,
      description: blogData?.attributes?.desc,
      images: [
        {
          url: blogData?.attributes?.image?.data?.attributes?.url,
        },
      ],
    },
  };
}

const Page = ({ params }) => {
  return (
    <>
      <NewsBlogComponent params={params} />
    </>
  );
};

export default Page;

Page.propTypes = {
  params: PropTypes.object,
};
