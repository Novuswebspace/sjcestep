/* eslint-disable camelcase*/

import * as Yup from "yup";

const FILE_SIZE = 4 * 1024 * 1024;
const SUPPORTED_FORMATS = ["application/pdf"];

export const studentsSchema = Yup.object().shape({
  Name: Yup.string()
    .matches(/^[^\s]/, "Name should not start with a space")
    .min(3, "Minimum 3 characters required")
    .max(20, "Maximum 20 characters only")
    .required("Name is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email is in invalid format")
    .email("Invalid email format")
    .required("Email is required")
    .test(
      "not-uppercase",
      "Email should not be entirely in uppercase letters",
      (value) => value !== value.toUpperCase()
    ),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .test(
      "startsWith6to9",
      "Phone number must start with a digit between 6 and 9",
      (value) => /^[6-9]/.test(value)
    )
    .required("Phone number is required"),
  college: Yup.string().required("College name is required"),
  university: Yup.string().required("University name is required"),
  usn: Yup.string().required("Usn/Serial number is required"),
  gender: Yup.string().required("Gender is required"),
  file: Yup.mixed()
    .required("Degree certificate is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  college_id: Yup.mixed()
    .required("College ID is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});
