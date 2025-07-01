"use client";
/* eslint-disable object-curly-newline*/
/* eslint-disable brace-style*/
/* eslint-disable no-undef*/
/* eslint-disable no-extra-parens*/
/* eslint-disable no-console*/
/* eslint-disable capitalized-comments*/
/* eslint-disable camelcase*/

import { useState, useRef } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Formik, Form, Field } from "formik";
import { studentsSchema } from "@/components/schemas/studentsSchema";
import axios from "axios";
import { toast } from "sonner";
import { PropTypes } from "prop-types";

function StudentForm({ open, setOpen, setShowPaymentScreen }) {
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFile1, setUploadedFile1] = useState(null);
  const [isLoader, setLoader] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);
  const [fileDetails1, setFileDetails1] = useState(null);
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);

  const handleUploadFile = () => {
    inputRef.current.click();
  };

  const handleUploadFile1 = () => {
    inputRef1.current.click();
  };

  // Handler for upload file with validation
  const handleFileChange = (event, setFieldValue) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const isValid = studentsSchema.fields.file.isValidSync(selectedFile);
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

  const handleFileChange1 = (event, setFieldValue) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const isValid =
        studentsSchema.fields.college_id.isValidSync(selectedFile);
      if (isValid) {
        setFieldValue("college_id", selectedFile);
        setFileDetails1(selectedFile);
        const formData = new FormData();
        formData.append("files", selectedFile);
        setUploadedFile1(formData);
        event.target.value = "";
      } else {
        setFieldValue("college_id", null);
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

  const handleDragOver1 = (event) => {
    event.preventDefault();
    setHover1(true);
  };

  const handleDrop = (event, setFieldValue) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const isValid = studentsSchema.fields.file.isValidSync(droppedFile);
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

  const handleDrop1 = (event, setFieldValue) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const isValid = studentsSchema.fields.college_id.isValidSync(droppedFile);
      if (isValid) {
        setFieldValue("college_id", droppedFile);
        setFileDetails1(droppedFile);
        const formData = new FormData();
        formData.append("files", droppedFile);
        setUploadedFile1(formData);
        event.target.value = "";
      } else {
        setFieldValue("college_id", null);
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
    setHover1(false);
    event.target.value = "";
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setHover(false);
  };

  const handleDragLeave1 = (event) => {
    event.preventDefault();
    setHover1(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoader(true);
      const userApplied = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/student-forms?filters[email][$eq]=${values.email}`
      );
      if (userApplied.data.data.length > 0) {
        resetForm();
        setUploadedFile(null);
        setUploadedFile1(null);
        toast.error("You have already Registered with us", {
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
      const uploadResponse1 = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/upload`,
        uploadedFile1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedFileId = uploadResponse.data[0].id;
      const uploadedFileId1 = uploadResponse1.data[0].id;

      const postData = {
        data: {
          Name: values.Name,
          college: values.college,
          email: values.email,
          phone: values.phone,
          gender: values.gender,
          file: uploadedFileId,
          university: values.university,
          usn: values.usn,
          college_id: uploadedFileId1,
        },
      };

      console.log(postData, "postststt");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/student-forms`,
        postData
      );
      console.log("Response:", response.data);
      setUploadedFile(null);
      setUploadedFile1(null);
      setTimeout(() => {
        setLoader(false);
        // toast.success("Successfully Registered for the Course", {
        //   cancel: {
        //     label: "Ok",
        //   },
        //   position: "top-center",
        //   duration: 3000,
        // });
        setShowPaymentScreen(true);
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
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <Formik
              initialValues={{
                Name: "",
                email: "",
                phone: "",
                college: "",
                university: "",
                usn: "",
                gender: "",
                file: null,
                college_id: null,
              }}
              validationSchema={studentsSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <main className="px-4 mb-4">
                    <div>
                      <img
                        onClick={() => setOpen(false)}
                        src="/images/internship/close-icon.svg"
                        alt="cross"
                        className="h-5 w-5 hidden lg:block cursor-pointer absolute right-10 top-10"
                      />
                      <div className="lg:text-center">
                        <span className="inline-block lg:mx-auto text-sm font-medium border border-lightish-gray bg-light-gray-sky px-3 py-1">
                          Apply
                        </span>
                      </div>
                      <p className="text-2xl lg:text-4xl font-black font-montserrat lg:text-center uppercase mt-4">
                        For Student
                      </p>
                    </div>
                    <div className="mt-8 h-[70vh] overflow-y-auto">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-1 lg:gap-y-0">
                        <div className="flex w-full flex-col min-h-24">
                          <label
                            htmlFor="Name"
                            className="text-sm font-medium text-extra-light-dark"
                          >
                            Full Name* (As per 10th certificate)
                          </label>
                          <Field
                            id="Name"
                            name="Name"
                            placeholder="Enter name"
                            type="text"
                            className="border border-light-gray py-2 pl-4 focus:outline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                          />
                          {errors.Name && touched.Name && (
                            <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                              {errors.Name}
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
                          placeholder="you@gmail.com"
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
                      <div className="flex flex-col mt-0 md:mt-1 min-h-24">
                        <label
                          htmlFor="college"
                          className="text-sm font-medium text-extra-light-dark"
                        >
                          College Name*
                        </label>
                        <Field
                          id="college"
                          name="college"
                          type="text"
                          placeholder="Enter College Name"
                          className="border border-light-gray py-2 pl-4 focus:outline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                        />
                        {errors.college && touched.college && (
                          <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                            {errors.college}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col mt-0 md:mt-1 min-h-24">
                        <label
                          htmlFor="university"
                          className="text-sm font-medium text-extra-light-dark"
                        >
                          University Name (Currently pursuing)*
                        </label>
                        <Field
                          id="university"
                          name="university"
                          type="text"
                          placeholder="Enter University Name"
                          className="border border-light-gray py-2 pl-4 focus:outline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                        />
                        {errors.university && touched.university && (
                          <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                            {errors.university}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col mt-0 md:mt-1 min-h-24">
                        <label
                          htmlFor="usn"
                          className="text-sm font-medium text-extra-light-dark"
                        >
                          USN/Serial Number*
                        </label>
                        <Field
                          id="usn"
                          name="usn"
                          type="text"
                          placeholder="Enter USN/Serial Number"
                          className="border border-light-gray py-2 pl-4 focus:outline-none focus:border focus-visible:outline-none focus:border-primary-violet focus:ring-4 ring-primary-violet mt-1.5"
                        />
                        {errors.usn && touched.usn && (
                          <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                            {errors.usn}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col mt-0 md:mt-1 min-h-24">
                        <label
                          htmlFor="gender"
                          className="text-sm font-medium text-extra-light-dark"
                        >
                          Gender*
                        </label>
                        <div className="mt-1.5 flex gap-4">
                          <label className="flex text-sm text-extra-light-dark cursor-pointer items-center">
                            <Field
                              id="gender-male"
                              name="gender"
                              type="radio"
                              value="male"
                              className="mr-1"
                            />
                            Male
                          </label>
                          <label className="flex text-sm text-extra-light-dark cursor-pointer items-center">
                            <Field
                              id="gender-female"
                              name="gender"
                              type="radio"
                              value="female"
                              className="mr-1"
                            />
                            Female
                          </label>
                          <label className="flex text-sm text-extra-light-dark cursor-pointer items-center">
                            <Field
                              id="gender-other"
                              name="gender"
                              type="radio"
                              value="other"
                              className="mr-1"
                            />
                            Other
                          </label>
                        </div>
                        {errors.gender && touched.gender && (
                          <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                            {errors.gender}
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
                        <p className="text-sm text-center px-1 font-normal text-tertiary-gray mt-3">
                          <button
                            disabled={uploadedFile}
                            type="button"
                            onClick={handleUploadFile}
                            className={`${uploadedFile ? "text-secondary-dark-gray cursor-not-allowed" : "text-secondary-violet"} text-sm font-semibold pr-1`}
                          >
                            Upload Degree Certificate
                          </button>
                          or drag and drop*
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
                          onChange={(event) =>
                            handleFileChange(event, setFieldValue)
                          }
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
                                <span className="inline-block line-clamp-1 font-medium text-sm">
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

                      <div
                        onDragOver={handleDragOver1}
                        onDragLeave={handleDragLeave1}
                        onDrop={(event) => handleDrop1(event, setFieldValue)}
                        className={`${hover1 ? "outline-4 ring-2 ring-secondary-dark-violet transition-all duration-500 ease-out border-secondary-dark-violet" : ""} relative flex flex-col items-center justify-center border outline-secondary-gray mt-7 lg:mt-8 py-4`}
                      >
                        <div className="border border-secondary-gray p-2 rounded-md shadow-sm">
                          <img
                            src="/images/internship/upload.svg"
                            alt="upload icon"
                          />
                        </div>
                        <p className="text-sm text-center px-1 font-normal text-tertiary-gray mt-3">
                          <button
                            disabled={uploadedFile1}
                            type="button"
                            onClick={handleUploadFile1}
                            className={`${uploadedFile1 ? "text-secondary-dark-gray cursor-not-allowed" : "text-secondary-violet"} text-sm font-semibold pr-1`}
                          >
                            Upload College ID
                          </button>
                          or drag and drop*
                        </p>
                        <p className="text-xs font-normal text-tertiary-gray mt-1">
                          PDF Format (max. 4MB)
                        </p>
                        <img
                          className={`${hover1 ? "opacity-100" : "opacity-0"} absolute right-5 bottom-5 ease-in-out duration-500 transition-opacity`}
                          src="/images/internship/file-type.svg"
                          alt="upload icon"
                        />
                        <img
                          src="/images/internship/cursor.svg"
                          alt="cursor"
                          className={`${hover1 ? "opacity-100" : "opacity-0"} absolute right-4 bottom-3 ease-in-out duration-500 transition-opacity`}
                        />
                        <input
                          ref={inputRef1}
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          multiple={false}
                          onChange={(event) =>
                            handleFileChange1(event, setFieldValue)
                          }
                        />
                      </div>
                      {errors.college_id && touched.college_id && (
                        <p className="text-red-500 pl-2 mt-1 text-sm font-medium">
                          {errors.college_id}
                        </p>
                      )}
                      {uploadedFile1 && (
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
                                <span className="inline-block line-clamp-1 font-medium text-sm">
                                  {fileDetails1?.name}
                                </span>
                                <span className="inline-block text-sm font-normal mt-0.5">
                                  {(
                                    parseInt(fileDetails1?.size) /
                                    (1024 * 1024)
                                  ).toFixed(2)}{" "}
                                  MB
                                </span>
                              </div>
                            </div>
                            <img
                              className="cursor-pointer"
                              onClick={() => setUploadedFile1(null)}
                              src="/images/internship/trash-icon.svg"
                              alt="trash icon"
                            />
                          </div>
                          <div className="flex items-center gap-x-3 justify-end mt-1.5">
                            <div className="w-4/5 bg-secondary-gray rounded-full h-2">
                              <div
                                className="bg-secondary-dark-violet h-2 rounded-full"
                                style={{
                                  width: `${(parseInt(fileDetails1?.size) / parseInt(fileDetails1?.size)) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-extra-light-dark">
                              {(
                                (parseInt(fileDetails1?.size) /
                                  parseInt(fileDetails1?.size)) *
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
                        className={`${isLoader ? "bg-sand-gray text-white cursor-not-allowed" : "bg-black text-white cursor-pointer hover:bg-black/[0.8] mb-3 hover:shadow-lg"} w-full text-base font-semibold mt-12 lg:mt-8 py-3`}
                      >
                        {isLoader ? "Sending..." : "Send message"}
                      </button>
                    </div>
                  </main>
                </Form>
              )}
            </Formik>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default StudentForm;

StudentForm.propTypes = {
  open: PropTypes.boolean,
  setOpen: PropTypes.func,
  setShowPaymentScreen: PropTypes.func,
};
