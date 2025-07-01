/* eslint-disable no-nested-ternary*/
/* eslint-disable object-curly-newline*/
/* eslint-disable react/no-unescaped-entities*/

"use client";
import React, { useState } from "react";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import Meta from "@/components/common/Meta";
import Loader from "@/components/common/loaders/primaryLoader";
import { featureData, programWeeks } from "@/components/course/data";
import Tab from "@/components/course/tab";
import {
  Star,
  Check,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle,
  GraduationCap,
} from "lucide-react";

import { motion } from "framer-motion";
import StudentForm from "@/components/course/studentForm";
import EmployeeForm from "@/components/course/employeeForm";
import PaymentModal from "@/components/course/paymentModal";
import Image from "next/image";
import HeaderText from "@/components/common/headerText";

const page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [studentForm, setStudentForm] = useState(false);
  const [employeeForm, setEmployeeForm] = useState(false);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  const blogHeadData = {
    heading: "The Founder's School",
    title: "The Founder's Fundamentals",
    desc: "Turn your business idea into a thriving startup with Mysore’s most practical entrepreneurship program.",
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 * index,
      },
    }),
  };

  return (
    <PrimaryLayout>
      <Loader />
      <Meta
        title="STEP : The Founder's Fundamentals"
        description="Turn your business idea into a thriving startup with Mysore’s most practical entrepreneurship program."
        keywords="Science, Technology, Entrepreneurs Park"
        ogTitle="STEP : The Founder's Fundamentals"
        ogDescription="Turn your business idea into a thriving startup with Mysore’s most practical entrepreneurship program."
        ogUrl="https://www.sjcestep.in/course"
        twitterTitle="STEP : The Founder's Fundamentals"
        twitterDescription="Turn your business idea into a thriving startup with Mysore’s most practical entrepreneurship program."
      />
      <section className="py-16 md:py-24">
        <div className="grid max-w-3xl md:mx-auto px-4 md:px-0 place-items-start md:place-items-center">
          {blogHeadData?.heading && (
            <HeaderText title={blogHeadData?.heading} />
          )}
          <p
            className={`font-montserrat md:text-center md:leading-[3.5rem] uppercase mt-3 text-2xl md:text-5xl text-primary-black font-black`}
          >
            {blogHeadData?.title}
          </p>
          <p
            className={`font-normal md:text-center text-tertiary-gray text-xl mt-5`}
          >
            Feb 15th 2025 (End by Apr 15th)
          </p>
          <p
            className={`font-normal md:text-center text-tertiary-gray text-xl mt-4`}
          >
            {blogHeadData?.desc}
          </p>
        </div>

        <section className="mt-14 px-4 md:px-20">
          <div className="max-w-7xl mx-auto md:grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-4">
              <img
                src="/images/course/EDP.jpg"
                alt="Entrepreneurs Development"
                className="w-full h-full"
              />
            </div>
            <div className="mt-10 md:mt-0 col-span-12 lg:col-span-8">
              <p className="text-3xl font-normal">
                Launch your startup in just 8 weeks!
              </p>
              <div className="w-full mt-8 max-w-5xl mx-auto">
                <p className="text-lg text-tertiary-gray">
                  Welcome to SJCE-STEP, Mysore's most trusted startup center
                  since 1985. For 40 years, we've been turning dreamers into
                  successful Entrepreneurs. With our 1000+ training programs
                  done, we have helped hundreds of Entrepreneurs launch their
                  businesses, which speaks to our proven track record. After 4
                  decades, we know exactly what it takes to turn your idea into
                  reality.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-24">
              <p className="text-center text-2xl md:text-5xl font-semibold">
                Why Entrepreneurs Choose Us
              </p>
            </div>
            <div className="mt-7 grid gap-8 md:grid-cols-2 m-xl:grid-cols-3 max-w-7xl mx-auto">
              {featureData.map((feature, index) => (
                <motion.div
                  variants={listItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 ${feature.iconBg} rounded-lg`}>
                      <feature.icon
                        className={`w-6 h-6 ${feature.iconColor}`}
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <ul className="space-y-3 text-tertiary-gray">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="mr-2">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="mt-24">
              <p className="text-center text-2xl md:text-5xl font-semibold">
                Your 8-Week Transformation
              </p>

              <div className="mt-6 w-full max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
                <div className="mb-6 border-b overflow-x-auto">
                  <div className="flex min-w-max">
                    {programWeeks.map((_, index) => (
                      <Tab
                        key={index}
                        title={`Week ${index === 1 ? "2-3" : index === 2 ? "4-5" : index === 3 ? "6-7" : index === 4 ? "8" : "1"}`}
                        isActive={activeTab === index}
                        onClick={() => setActiveTab(index)}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-6 min-h-[300px] w-full" role="tabpanel">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                    {programWeeks[activeTab].title}
                  </h2>
                  <div className="h-[250px] overflow-y-auto pr-4">
                    <ul className="space-y-4">
                      {programWeeks[activeTab].content.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-3 text-blue-600 text-xl">•</span>
                          <span className="text-tertiary-gray">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment cards */}

        <div className="mt-14 px-4 md:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Investment Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Investment in Your Future
                </h2>
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-semibold">
                      Early Bird Price:
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹2,000
                    </span>
                  </div>
                  <div className="text-sm text-tertiary-gray">
                    (Regular ₹20,000)
                  </div>
                  <ul className="space-y-2">
                    {[
                      "24 live online sessions",
                      "8 in-person bootcamps",
                      "1-on-1 mentorship sessions",
                      "Access to course materials (Online only)",
                      "Certificate of completion",
                      "Alumni network membership",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Star className="mr-2 h-4 w-4 text-yellow-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Who Should Join Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Who Should Join?</h2>
                <ul className="space-y-4">
                  {[
                    "First-time founders with business ideas",
                    "Professionals planning to start up",
                    "Early-stage founders seeking structure",
                    "Students passionate about entrepreneurship",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Application submission */}

        <div className="bg-gradient-to-br mt-14 from-purple-100 to-indigo-100 min-h-screen py-12 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8">
              Application Process
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-hidden">
              <div className="p-6 bg-white shadow-xl rounded-lg sm:p-10">
                <h4 className="text-2xl mb-3 md:text-3xl font-bold text-center text-gray-900">
                  FOR STUDENTS
                </h4>
                <p className="text-2xl text-center font-bold text-green-600">
                  ₹500
                </p>
                <div className="mt-5 p-4 bg-blue-100 rounded-lg">
                  <p className="text-blue-800 font-semibold flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-blue-600" />
                    Eligibility Criteria
                  </p>
                  <p className="mt-2 text-blue-700 flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Should have bachelor's or diploma degree in any fields of
                      Science and Technology
                    </span>
                  </p>
                </div>
                <ol className="space-y-6 mt-5">
                  {[
                    "Submit your application",
                    "Secure your spot with payment",
                    "Begin your founder journey",
                  ].map((step, index) => (
                    <li key={index} className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <span className="ml-4 text-lg text-tertiary-gray">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-10">
                  <button
                    onClick={() => setStudentForm(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    <span className="flex items-center justify-center">
                      Apply Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </button>
                  <p className="text-center text-indigo-600 font-semibold mt-2">
                    10 Seats Left
                  </p>
                  <p className="text-center text-tertiary-gray mt-1">
                    Feb 15th 2025 (End by Apr 15th)
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white shadow-xl rounded-lg sm:p-10">
                <h4 className="text-2xl mb-3 md:text-3xl font-bold text-center text-gray-900">
                  FOR OTHERS
                </h4>
                <p className="text-2xl text-center font-bold text-green-600">
                  ₹2,000
                </p>
                <div className="mt-5 p-4 bg-blue-100 rounded-lg">
                  <p className="text-blue-800 font-semibold flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-blue-600" />
                    Eligibility Criteria
                  </p>
                  <p className="mt-2 text-blue-700 flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Should have bachelor's or diploma degree in any fields of
                      Science and Technology
                    </span>
                  </p>
                </div>
                <ol className="space-y-6 mt-5">
                  {[
                    "Submit your application",
                    "Secure your spot with payment",
                    "Begin your founder journey",
                  ].map((step, index) => (
                    <li key={index} className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <span className="ml-4 text-lg text-tertiary-gray">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-10">
                  <button
                    onClick={() => setEmployeeForm(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    <span className="flex items-center justify-center">
                      Apply Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </button>
                  <p className="text-center text-indigo-600 font-semibold mt-2">
                    10 Seats Left
                  </p>
                  <p className="text-center text-tertiary-gray mt-1">
                    Feb 15th 2025 (End by Apr 15th)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="p-6 sm:p-10 flex gap-y-10 flex-col lg:flex-row justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Have questions? We're here to help.
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="h-6 w-6 text-indigo-500 mr-3" />
                      <a
                        href="tel:+91636282369"
                        className="text-lg text-tertiary-gray hover:text-indigo-600 transition duration-300 ease-in-out"
                      >
                        +91 636282369
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-6 w-6 text-indigo-500 mr-3" />
                      <a
                        href="mailto:project@sjcestep.in"
                        className="text-lg text-tertiary-gray hover:text-indigo-600 transition duration-300 ease-in-out"
                      >
                        project@sjcestep.in
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start lg:items-end">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Powered by DST and DST NIDHI
                  </h3>
                  <div className="flex w-full flex-col md:flex-row md:space-x-4">
                    <Image
                      src="/images/course/DST logo.png"
                      alt="DST Logo"
                      sizes="100vw"
                      width={0}
                      height={0}
                      className="rounded-lg w-full md:w-[150px]"
                    />
                    <Image
                      src="/images/course/DST NIDHI logo.jpg"
                      alt="DST NIDHI Logo"
                      sizes="100vw"
                      width={0}
                      height={0}
                      className="rounded-lg w-full md:w-[150px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <StudentForm
          open={studentForm}
          setOpen={setStudentForm}
          setShowPaymentScreen={setShowPaymentScreen}
        />
        <EmployeeForm
          open={employeeForm}
          setOpen={setEmployeeForm}
          setShowPaymentScreen={setShowPaymentScreen}
        />
        <PaymentModal open={showPaymentScreen} setOpen={setShowPaymentScreen} />
      </section>
    </PrimaryLayout>
  );
};

export default page;
