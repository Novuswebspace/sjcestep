/* eslint-disable object-curly-newline*/
/* eslint-disable no-console*/
/* eslint-disable no-unused-vars*/
/* eslint-disable brace-style*/
/* eslint-disable multiline-ternary */

"use client";
import Link from "next/link";
import { discoverData, exploreData, otherLinks } from "./data";
import { PropTypes } from "prop-types";
import { useState } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { subscribeSchema } from "../schemas/subscribeSchema";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Footer = ({ className, item, footerColor = false }) => {
  // eslint-disable-next-line no-undef
  const BASEURL = process.env.NEXT_PUBLIC_URL;
  const [loading, setLoading] = useState(false);

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
      console.log("Response:", response.data);
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

  return (
    <footer
      className={`${footerColor ? "bg-white" : "bg-light-gray-sky"} grid grid-cols-1 gap-5 lg:gap-0 lg:grid-cols-7 px-4 md:px-20 py-12 lg:py-0 lg:pt-16 lg:pb-12 max-w-8xl mx-auto ${className}`}
    >
      <div className="lg:col-span-3 order-1 lg:order-none">
        <Link href="/">
          <img
            src={item?.attributes?.companyLogo?.data?.attributes?.url}
            alt="Step Logo"
            className="h-20 object-cover"
          />
        </Link>
        <p className="text-tertiary-gray mt-6 lg:mt-8 max-w-xs">
          {item?.attributes?.address}
        </p>
        <div>
          <ul className="flex gap-3 mt-3">
            {item?.attributes?.socialIcons?.map((each, index) => (
              <li key={index}>
                <Link href={each?.link} target="_blank">
                  <img
                    title={each.name}
                    src={each?.image?.data?.attributes?.url}
                    alt={each.name}
                    className="h-8 w-8"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-8 lg:mt-0 lg:col-span-2 order-3 lg:order-none">
        <div>
          <p className="font-semibold text-primary-dark-blue">Quick Links</p>
          <ul className="flex flex-col gap-3 mt-3">
            {discoverData.map((each, index) => (
              <Link href={each?.path} key={index}>
                <motion.li
                  whileHover={{ scale: 1.2, originX: 0 }}
                  transition={{ type: "tween", stiffness: 300 }}
                  className="font-semibold text-black"
                >
                  {each.title}
                </motion.li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-dark-blue">Explore</p>
          <ul className="flex flex-col gap-3 mt-3">
            {exploreData.map((each, index) => (
              <Link href={each?.path} key={index}>
                <motion.li
                  whileHover={{ scale: 1.2, originX: 0 }}
                  transition={{ type: "tween", stiffness: 300 }}
                  className="font-semibold text-black"
                >
                  {each.title}
                  {each.notify && (
                    <span className="border px-1 ml-1 border-black text-xs">
                      {each.notify}
                    </span>
                  )}
                </motion.li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="lg:col-span-2 order-2 lg:order-none">
        <p className="font-semibold text-black">Stay up to date</p>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={subscribeSchema}
          onSubmit={handleSubmit}
        >
          {({ errors }) => (
            <Form>
              <div className="w-full flex flex-col lg:flex-row items-center gap-4 mt-4">
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="pl-2 h-12 md:h-10 w-full rounded-sm border focus:ouline-none focus:border-1 focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet bg-white border-light-gray"
                />
                <button
                  type="submit"
                  className={`${loading ? "bg-sand-gray text-white cursor-not-allowed" : "bg-black text-white cursor-pointer hover:bg-black/[0.8] hover:shadow-lg"} w-full rounded-sm lg:w-auto h-12 md:h-10 px-6`}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
              {errors.email && (
                <p className="text-red-400 pl-2 mt-1 text-sm font-medium">
                  {errors.email}*
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <hr className="lg:col-span-7 w-full border border-secondary-gray mt-8 lg:mt-14 order-4 lg:order-none" />
      <div className="lg:col-span-7 flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center mt-3 lg:mt-8 order-5 lg:order-none">
        <p className="text-light-blue-gray mt-3 lg:mt-0 text-base order-2 lg:order-none">
          &copy; {new Date().getFullYear()} {item?.attributes?.copyRight}
        </p>

        <ul className="flex items-center gap-4 order-1 lg:order-none">
          {otherLinks.map((each, index) => (
            <Link href={each?.path} key={index}>
              <li className="text-light-blue-gray">{each.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

Footer.propTypes = {
  className: PropTypes.str,
  item: PropTypes.object,
  footerColor: PropTypes.boolean,
};
