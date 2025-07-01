/* eslint-disable no-undef*/
/* eslint-disable no-console*/
/* eslint-disable brace-style*/
/* eslint-disable object-curly-newline*/

import { PropTypes } from "prop-types";
import axios from "axios";
import PastEventComponent from "@/components/events/pastEventComponent";

export async function generateMetadata({ params }) {
  let pastEventsData;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/past-events?filters[slug][$eq]=${params.id}&populate=*`
    );
    pastEventsData = response.data.data[0];
  } catch (error) {
    console.log(error);
  }

  return {
    title: pastEventsData?.attributes?.title
      ? `${pastEventsData.attributes.title}`
      : "STEP: Past Events",
    description: pastEventsData?.attributes?.desc || "STEP: Past Events",
    keywords: "workshops, aspiring entrepreneurs,past events",
    openGraph: {
      title: pastEventsData?.attributes?.title,
      description: pastEventsData?.attributes?.desc,
      images: [
        {
          url: pastEventsData?.attributes?.image?.data?.attributes?.url,
        },
      ],
      url: `https://www.sjcestep.in/events/past/${params.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: pastEventsData?.attributes?.title,
      description: pastEventsData?.attributes?.desc,
      images: [
        {
          url: pastEventsData?.attributes?.image?.data?.attributes?.url,
        },
      ],
    },
  };
}

const Page = ({ params }) => {
  return (
    <>
      <PastEventComponent params={params} />
    </>
  );
};

export default Page;

Page.propTypes = {
  params: PropTypes.object,
};
