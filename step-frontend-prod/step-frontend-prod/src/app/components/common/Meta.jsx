import React from "react";
import PropTypes from "prop-types";

const Meta = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogUrl,
  twitterTitle,
  twitterDescription,
  ogImage,
  twitterImage,
}) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta
        property="og:image"
        content={
          ogImage || "https://www.sjcestep.in/images/home/step-logo-updated.png"
        }
      />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SJCE_STEP" />
      {/* Twitter Meta Tags */}
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta
        name="twitter:description"
        content={twitterDescription || description}
      />
      <meta
        name="twitter:image"
        content={
          twitterImage ||
          "https://www.sjcestep.in/images/home/step-logo-updated.png"
        }
      />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
};

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogUrl: PropTypes.string,
  twitterTitle: PropTypes.string,
  twitterDescription: PropTypes.string,
  twitterImage: PropTypes.string,
  ogImage: PropTypes.string,
};

export default Meta;
