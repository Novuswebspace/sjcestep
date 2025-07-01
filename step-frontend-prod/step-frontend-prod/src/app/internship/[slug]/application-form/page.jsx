"use client";
/* eslint-disable object-curly-newline*/
/* eslint-disable no-unused-vars*/
/* eslint-disable no-console*/
/* eslint-disable no-undef*/
/* eslint-disable brace-style*/
/* eslint-disable no-extra-parens*/
import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { PropTypes } from "prop-types";
import axios from "axios";
import { toast } from "sonner";
import PrimaryLayout from "@/components/layouts/primaryLayout";
import { applicationSchema } from "@/components/schemas/applicationSchema";
import Meta from "@/app/components/common/Meta";

export default function ApplicationForm({ params }) {
  const [hover, setHover] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoader, setLoader] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const { slug } = params;

  const postName = useSearchParams().get("post");

  const handleUploadFile = () => {
    inputRef.current.click();
  };

  // Handler for upload file with validation
  const handleFileChange = (event, setFieldValue) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const isValid = applicationSchema.fields.file.isValidSync(selectedFile);
      if (isValid) {
        setFieldValue("file", selectedFile);
        setFileDetails(selectedFile);
        const formData = new FormData();
        formData.append("files", selectedFile);
        setUploadedFile(formData);
        event.target.value = "";
      } else {
        setFieldValue("file", null);
        toast.error(
          "Invalid file format or size. Please upload a PDF file smaller than 4MB."
        );
        event.target.value = "";
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setHover(true);
  };

  const handleDrop = (event, setFieldValue) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const isValid = applicationSchema.fields.file.isValidSync(droppedFile);
      if (isValid) {
        setFieldValue("file", droppedFile);
        setFileDetails(droppedFile);
        const formData = new FormData();
        formData.append("files", droppedFile);
        setUploadedFile(formData);
        event.target.value = "";
      } else {
        setFieldValue("file", null);
        toast.error(
          "Invalid file format or size. Please upload a PDF file smaller than 4MB.",
          {
            cancel: {
              label: "Ok",
            },
          }
        );
        event.target.value = "";
      }
    }
    setHover(false);
    event.target.value = "";
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setHover(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoader(true);
      const userApplied = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/internship-applications?filters[email][$eq]=${values.email}&filters[post][$eq]=${postName}`
      );
      if (userApplied.data.data.length > 0) {
        resetForm();
        setUploadedFile(null);
        toast.error("You have already applied for this post", {
          cancel: {
            label: "Ok",
          },
        });
        setLoader(false);
        return null;
      }
      const uploadResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/upload`,
        uploadedFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedFileId = uploadResponse.data[0].id;
      const postData = {
        data: {
          post: postName,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          message: values.message,
          file: uploadedFileId,
        },
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/internship-applications`,
        postData
      );
      console.log("Response:", response.data);
      setUploadedFile(null);
      setTimeout(() => {
        setLoader(false);
        toast.success("Successfully applied for the post", {
          cancel: {
            label: "Ok",
          },
          position: "top-center",
          duration: 3000,
        });
      }, 1500);
      resetForm();
    } catch (error) {
      setTimeout(() => {
        setLoader(false);
        toast.error("Something went wrong!", {
          cancel: {
            label: "Ok",
          },
          position: "top-center",
          duration: 3000,
        });
      }, 1500);
    }
  };

  return (
    <PrimaryLayout className={"lg:hidden"}>
      <Meta
        title={`STEP Careers | Application form for the ${postName}`}
        description="STEP is hiring the best and brightest minds to build one of the world's most versatile things."
        keywords="Innovation, Brightest,Careers"
        ogTitle={`STEP Careers | Application form for the ${postName}`}
        ogDescription="STEP is hiring the best and brightest minds to build one of the world's most versatile things."
        ogUrl="https://www.sjcestep.in/internship"
        twitterTitle={`STEP Careers | Application form for the ${postName}`}
        twitterDescription="STEP is hiring the best and brightest minds to build one of the world's most versatile things."
      />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          file: null,
        }}
        validationSchema={applicationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <main className="max-w-xl mx-auto px-4 mb-24">
              <img
                onClick={() => router.back()}
                src="/images/internship/close-icon.svg"
                alt="cross"
                className="h-5 w-5 hidden lg:block cursor-pointer absolute right-10 top-10"
              />
              <div className="lg:text-center">
                <span className="inline-block lg:mx-auto text-sm font-medium border border-lightish-gray bg-light-gray-sky px-3 py-1 !mt-24">
                  Apply
                </span>
              </div>
              <p className="text-2xl lg:text-4xl font-black font-montserrat lg:text-center uppercase mt-4">
                {postName}
              </p>
              <p className="lg:text-center text-lg lg:text-xl font-normal text-tertiary-gray mt-8">
                Apply for this job.
              </p>
              <div className="lg:px-7 mt-11">
                <div className="flex flex-col gap-x-8 lg:flex-row lg:items-center lg:justify-between gap-y-1 lg:gap-y-0">
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
                      className="border border-light-gray py-2 pl-4 focus:outline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
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
                      className="border border-light-gray py-2 pl-4 focus:outline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
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
                    className="border border-light-gray py-2 pl-4 focus:outline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
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
                    className="border border-light-gray py-2 pl-4 focus:outline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="flex flex-col mt-0 md:mt-1 min-h-52">
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
                    className="h-[134px] border border-light-gray py-2 pl-4 focus:outline-none resize-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                  />
                  {errors.message && touched.message && (
                    <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                      {errors.message}
                    </p>
                  )}
                </div>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(event) => handleDrop(event, setFieldValue)}
                  className={`${hover ? "outline-4 ring-2 ring-secondary-dark-violet transition-all duration-500 ease-out border-secondary-dark-violet" : ""} relative flex flex-col items-center justify-center border outline-secondary-gray mt-3 lg:mt-4 py-4`}
                >
                  <div className="border border-secondary-gray p-2 rounded-md shadow-sm">
                    <img
                      src="/images/internship/upload.svg"
                      alt="upload icon"
                    />
                  </div>
                  <p className="text-sm font-normal text-tertiary-gray mt-3">
                    <button
                      disabled={uploadedFile}
                      type="button"
                      onClick={handleUploadFile}
                      className={`${uploadedFile ? "text-secondary-dark-gray cursor-not-allowed" : "text-secondary-violet"} text-sm font-semibold pr-1`}
                    >
                      Upload Resume
                    </button>
                    or drag and drop
                  </p>
                  <p className="text-xs font-normal text-tertiary-gray mt-1">
                    PDF Format (max. 4MB)
                  </p>
                  <img
                    className={`${hover ? "opacity-100" : "opacity-0"} absolute right-5 bottom-5 ease-in-out duration-500 transition-opacity`}
                    src="/images/internship/file-type.svg"
                    alt="upload icon"
                  />
                  <img
                    src="/images/internship/cursor.svg"
                    alt="cursor"
                    className={`${hover ? "opacity-100" : "opacity-0"} absolute right-4 bottom-3 ease-in-out duration-500 transition-opacity`}
                  />
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    multiple={false}
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                  />
                </div>
                {errors.file && touched.file && (
                  <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                    {errors.file}
                  </p>
                )}
                {uploadedFile && (
                  <div className="border-secondary-gray border mt-4 py-4 px-3.5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-x-3">
                        <div>
                          <img
                            src="/images/internship/file-type.svg"
                            alt="file type icon"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="inline-block font-medium text-sm">
                            {fileDetails?.name}
                          </span>
                          <span className="inline-block text-sm font-normal mt-0.5">
                            {(
                              parseInt(fileDetails?.size) /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </span>
                        </div>
                      </div>
                      <img
                        className="cursor-pointer"
                        onClick={() => setUploadedFile(null)}
                        src="/images/internship/trash-icon.svg"
                        alt="trash icon"
                      />
                    </div>
                    <div className="flex items-center gap-x-3 justify-end mt-1.5">
                      <div className="w-4/5 bg-secondary-gray rounded-full h-2">
                        <div
                          className="bg-secondary-dark-violet h-2 rounded-full"
                          style={{
                            width: `${(parseInt(fileDetails?.size) / parseInt(fileDetails?.size)) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-extra-light-dark">
                        {(
                          (parseInt(fileDetails?.size) /
                            parseInt(fileDetails?.size)) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoader}
                  className={`${isLoader ? "bg-sand-gray text-white cursor-not-allowed" : "bg-black text-white cursor-pointer hover:bg-black/[0.8] hover:shadow-lg"} w-full text-base font-semibold mt-12 lg:mt-8 py-3`}
                >
                  {isLoader ? "Sending..." : "Send message"}
                </button>
              </div>
            </main>
          </Form>
        )}
      </Formik>
    </PrimaryLayout>
  );
}

ApplicationForm.propTypes = { params: PropTypes.object.isRequired };
