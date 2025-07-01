"use client";
import React from "react";
import PrimaryLayout from "../components/layouts/primaryLayout";
import HeaderText from "../components/common/headerText";
import Meta from "../components/common/Meta";
import { termsConditionsData } from "../components/policy/data";

const Page = () => {
  return (
    <PrimaryLayout>
      <Meta
        title="STEP: Terms and Condition"
        description="At SJCE-STEP, we offer a range of programs designed to support innovation and entrepreneurship. Our flagship programs include NIDHI Prayas, SISFS, and accelerator"
        keywords="Innovation, Incubation Opportunities"
        ogTitle="STEP: Terms and Condition"
        ogDescription="At SJCE-STEP, we offer a range of programs designed to support innovation and entrepreneurship. Our flagship programs include NIDHI Prayas, SISFS, and accelerator"
        ogUrl="https://www.sjcestep.in/terms-and-condition"
        twitterTitle="STEP: Terms and Condition"
        twitterDescription="At SJCE-STEP, we offer a range of programs designed to support innovation and entrepreneurship. Our flagship programs include NIDHI Prayas, SISFS, and accelerator"
      />

      <section className="md:max-w-4xl px-5 text-base text-light-dark font-montserrat font-medium pb-16 pt-16 md:pt-24 md:mx-auto">
        <div className="grid place-items-start md:place-items-center">
          <HeaderText title="Terms And Condition" />
          <h1 className="font-montserrat md:leading-[3.7rem] uppercase mt-3 text-2xl md:text-5xl text-primary-black font-black">
            Terms and condition
          </h1>
        </div>

        <p className="mt-7 text-xl text-start md:text-center text-tertiary-gray">
          This Terms and Condition Policy outlines how we collect, use, and
          protect your personal information.
        </p>

        {/* policies */}

        <section className="mt-10 flex flex-col gap-y-10">
          {termsConditionsData.map((item, index) => (
            <div key={item.id}>
              <p className="font-semibold text-xl font-montserrat">
                {index + 1}. {item.title}:
              </p>
              {item.desc &&
                item.desc.map((data, index) => (
                  <div key={index} className="mt-4 flex flex-col gap-y-4">
                    <p className="text-tertiary-gray text-lg font-montserrat font-medium">
                      {data.statement}
                    </p>
                  </div>
                ))}
            </div>
          ))}
        </section>

        <p className="mt-8 text-xl text-tertiary-gray text-center font-montserrat">
          By using our website, you consent to the collection and use of your
          information as outlined in this Terms and condition. Thank you for
          trusting us with your personal information.
        </p>
      </section>
    </PrimaryLayout>
  );
};

export default Page;
