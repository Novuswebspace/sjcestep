/* eslint-disable no-undef*/
/* eslint-disable no-console*/
/* eslint-disable brace-style*/
/* eslint-disable object-curly-newline*/

import { PropTypes } from "prop-types";
import axios from "axios";
import ProgramComponent from "@/components/programs/programComponent";

export async function generateMetadata({ params }) {
  let programsData;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/programs?filters[slug][$eq]=${params.id}&populate=*`
    );
    programsData = response.data.data[0];
  } catch (error) {
    console.log(error);
  }

  return {
    title: programsData?.attributes?.title
      ? `${programsData.attributes.title}`
      : "STEP: Programs",
    description: programsData?.attributes?.desc || "STEP: Programs",
    keywords: "innovative programs, transforms",
    openGraph: {
      title: programsData?.attributes?.title,
      description: programsData?.attributes?.desc,
      images: [
        {
          url: programsData?.attributes?.image?.data?.attributes?.url,
        },
      ],
      url: `https://www.sjcestep.in/programs/${params.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: programsData?.attributes?.title,
      description: programsData?.attributes?.desc,
      images: [
        {
          url: programsData?.attributes?.image?.data?.attributes?.url,
        },
      ],
    },
  };
}

const Page = ({ params }) => {
  return (
    <>
      <ProgramComponent params={params} />
    </>
  );
};

export default Page;

Page.propTypes = {
  params: PropTypes.object,
};
