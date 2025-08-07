/* eslint-disable brace-style*/
/* eslint-disable no-unused-vars*/
/* eslint-disable no-undefined*/
/* eslint-disable no-undef*/
/* eslint-disable object-curly-newline*/
/* eslint-disable no-console */

"use client";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { PropTypes } from "prop-types";
import { toast } from "sonner";
import { contactSchema } from "../components/schemas/contactSchema";
import { useState } from "react";
import Meta from "../components/common/Meta";
import Image from "next/image";

export default function ContactForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    const postData = {
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        message: values.message,
      },
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/contacts`,
        postData
      );

      setTimeout(() => {
        toast.success("Successfully sent!", {
          cancel: {
            label: "Ok",
          },
          position: "top-center",
        });
        setLoading(false);
      }, 1500);
      resetForm();
    } catch (error) {
      setTimeout(() => {
        toast.error("Something went wrong!", {
          cancel: {
            label: "Ok",
          },
          position: "top-center",
        });
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <PrimaryLayout className={"lg:hidden"}>
      <Meta
        title="STEP: Contact Us"
        description="SJCE-STEP, JSS Technical institution Campus, Manasagangothri, Mysuru-570006"
        keywords="Innovation, Incubation Opportunities"
        ogTitle="STEP: Contact Us"
        ogDescription="SJCE-STEP, JSS Technical institution Campus, Manasagangothri, Mysuru-570006"
        ogUrl="https://www.sjcestep.in/contact"
        twitterTitle="STEP: Contact Us"
        twitterDescription="SJCE-STEP, JSS Technical institution Campus, Manasagangothri, Mysuru-570006"
      />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        }}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <main className="mb-24 mt-16 px-4 md:px-20 max-w-7xl md:mx-auto flex flex-col gap-y-16 lg:flex-row lg:gap-x-10 xl:gap-x-28">
              <section className="w-full lg:w-1/2">
                <img
                  onClick={() => router.back()}
                  src="/images/internship/close-icon.svg"
                  alt="cross"
                  className="h-5 w-5 hidden lg:block cursor-pointer absolute right-10 top-10"
                />
                <p className="text-3xl lg:text-4xl font-black font-montserrat uppercase mt-4">
                  Contact Form
                </p>
                <p className="text-lg lg:text-xl font-normal text-tertiary-gray mt-5">
                  Our friendly team would love to hear from you.
                </p>
                <div className="mt-12">
                  <div className="flex flex-col w-full xl:flex-row gap-x-5 lg:items-center lg:justify-between gap-y-1 lg:gap-y-0">
                    <div className="flex w-full flex-col min-h-28">
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium text-extra-light-dark"
                      >
                        First name*
                      </label>
                      <Field
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        type="text"
                        className="border border-light-gray py-2 pl-4 focus:ouline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                      />
                      {errors.firstName && touched.firstName && (
                        <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="flex w-full flex-col min-h-28">
                      <label
                        htmlFor="lastName"
                        className="text-sm font-medium text-extra-light-dark"
                      >
                        Last name*
                      </label>
                      <Field
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        type="text"
                        className="border border-light-gray py-2 pl-4 focus:ouline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                      />
                      {errors.lastName && touched.lastName && (
                        <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mt-0 md:mt-1 min-h-24">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-extra-light-dark"
                    >
                      Email*
                    </label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="you@cogmail.com"
                      type="email"
                      className="border border-light-gray py-2 pl-4 focus:ouline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 pl-2 mt-1 text-xs md:text-sm font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mt-0 md:mt-1 min-h-24">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-extra-light-dark"
                    >
                      Phone number*
                    </label>
                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="9876544321"
                      className="border border-light-gray py-2 pl-4 focus:ouline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mt-0 md:mt-1 min-h-36">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-extra-light-dark"
                    >
                      Message*
                    </label>
                    <Field
                      id="message"
                      name="message"
                      as="textarea"
                      placeholder="Leave us a message..."
                      className="h-[88px] border border-light-gray py-2 pl-4 focus:ouline-none resize-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                    />
                    {errors.message && touched.message && (
                      <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${loading ? "bg-sand-gray text-white cursor-not-allowed" : "bg-black text-white cursor-pointer hover:bg-black/[0.8] hover:shadow-lg"} w-full text-base font-semibold mt-12 lg:mt-8 py-3`}
                  >
                    {loading ? "Sending..." : "Send message"}
                  </button>
                </div>
              </section>

              <section className="w-full lg:w-1/2">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/images/contact/building-image.png"
                  className="w-full h-full"
                  alt="building image"
                />
              </section>
            </main>
          </Form>
        )}
      </Formik>
    </PrimaryLayout>
  );
}
ContactForm.propTypes = { params: PropTypes.obj };
