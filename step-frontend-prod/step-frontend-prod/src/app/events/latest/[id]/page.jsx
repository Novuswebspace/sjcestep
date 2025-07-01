/* eslint-disable no-undef*/
/* eslint-disable no-console*/
/* eslint-disable brace-style*/
/* eslint-disable object-curly-newline*/

import { PropTypes } from "prop-types";
import axios from "axios";
import LatestEventComponent from "@/components/events/latestEventComponent";

export async function generateMetadata({ params }) {
  let latestEventsData;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/upcoming-events?filters[slug][$eq]=${params.id}&populate=*`
    );
    latestEventsData = response.data.data[0];
  } catch (error) {
    console.log(error);
  }

  return {
    title: latestEventsData?.attributes?.title
      ? `${latestEventsData.attributes.title}`
      : "STEP: Upcoming Events",
    description: latestEventsData?.attributes?.desc || "STEP: Upcoming Events",
    keywords: "workshops, aspiring entrepreneurs,latest events",
    openGraph: {
      title: latestEventsData?.attributes?.title,
      description: latestEventsData?.attributes?.desc,
      images: [
        {
          url: latestEventsData?.attributes?.image?.data?.attributes?.url,
        },
      ],
      url: `https://www.sjcestep.in/events/latest/${params.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: latestEventsData?.attributes?.title,
      description: latestEventsData?.attributes?.desc,
      images: [
        {
          url: latestEventsData?.attributes?.image?.data?.attributes?.url,
        },
      ],
    },
  };
}

const Page = ({ params }) => {
  return (
    <>
      <LatestEventComponent params={params} />
    </>
  );
};

export default Page;

Page.propTypes = {
  params: PropTypes.object,
};
