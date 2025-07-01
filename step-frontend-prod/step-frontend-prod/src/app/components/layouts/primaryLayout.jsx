/* eslint-disable multiline-ternary */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable brace-style */
import Footer from "./footer";
import Header from "./header";
import { PropTypes } from "prop-types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function PrimaryLayout({ children, className, footerColor }) {
  const fetchFooterData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/footer?populate[socialIcons][populate]=*&populate[companyLogo][populate]=*`
    );
    return data.data;
  };

  const { data: footerData } = useQuery({
    queryKey: ["footerData"],
    queryFn: fetchFooterData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Header className={className} item={footerData} />
      {children}
      <Footer
        className={className}
        item={footerData}
        footerColor={footerColor}
      />
    </>
  );
}

PrimaryLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.str,
  footerColor: PropTypes.boolean,
};
