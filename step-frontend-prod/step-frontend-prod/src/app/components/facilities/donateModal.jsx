"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { toast } from "sonner";
import { PropTypes } from "prop-types";
import { donateSchema } from "../schemas/donateSchema";

export default function DonateModal({ open, setOpen }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    const postData = {
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      },
    };
    try {
      setLoading(true);
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        // eslint-disable-next-line no-undef
        `${process.env.NEXT_PUBLIC_URL}/donation-forms`,
        postData
      );
      setTimeout(() => {
        toast.success("Successfully sent!", {
          cancel: { label: "Ok" },
          position: "top-center",
        });
        setLoading(false);
        setOpen(false);
      }, 1500);
      resetForm();
      // eslint-disable-next-line brace-style
    } catch (err) {
      setTimeout(() => {
        toast.error("Something went wrong!", {
          cancel: { label: "Ok" },
          position: "top-center",
        });
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <Dialog open={open} onClose={() => true} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: "",
              }}
              validationSchema={donateSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <main className="">
                    <section className="w-full">
                      <p className="text-3xl lg:text-4xl font-black font-montserrat uppercase mt-4">
                        Donation Form
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
                        <button
                          type="submit"
                          disabled={loading}
                          className={`${loading ? "bg-sand-gray text-white cursor-not-allowed" : "bg-black text-white cursor-pointer hover:bg-black/[0.8] hover:shadow-lg"} w-full text-base font-semibold mt-12 lg:mt-8 py-3`}
                        >
                          {loading ? "Sending..." : "Send message"}
                        </button>
                      </div>
                    </section>
                  </main>
                </Form>
              )}
            </Formik>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
DonateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
